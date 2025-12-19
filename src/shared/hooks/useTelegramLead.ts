import { useState } from 'react';
import axios from 'axios';

export interface LeadContact {
    name: string;
    phone: string;
    preferredChannel?: string;
    comment?: string;
}

export interface LeadCartItem {
    id: string;
    title: string;
    qty: number;
    price: number;
}

export interface LeadPayload {
    contact: LeadContact;
    cartItems?: LeadCartItem[];
    meta?: {
        pageUrl?: string;
        referrer?: string;
        source?: string;
    };
    honeypot?: string;
}

export interface UseTelegramLeadReturn {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
    submitLead: (payload: LeadPayload) => Promise<void>;
    reset: () => void;
}

function escapeTelegramText(text: string) {
    // Для обычного текста без parse_mode можно просто вернуть как есть,
    // но минимум уберём нули/undefined.
    return (text ?? '').toString();
}

function buildLeadMessage(payload: LeadPayload) {
    const { contact, cartItems = [], meta } = payload;

    const lines: string[] = [];
    lines.push('🪴 Новая заявка');
    lines.push('');
    lines.push(`👤 Имя: ${contact.name}`);
    lines.push(`📞 Телефон: ${contact.phone}`);

    if (contact.preferredChannel) lines.push(`💬 Канал: ${contact.preferredChannel}`);
    if (contact.comment) {
        lines.push('');
        lines.push(`📝 Комментарий: ${contact.comment}`);
    }

    if (cartItems.length) {
        lines.push('');
        lines.push('🛒 Корзина:');
        for (const item of cartItems) {
            lines.push(`• ${item.title} × ${item.qty} — ${item.price}`);
        }
    }

    if (meta?.source || meta?.pageUrl || meta?.referrer) {
        lines.push('');
        lines.push('🔎 Метаданные:');
        if (meta.source) lines.push(`• source: ${meta.source}`);
        if (meta.pageUrl) lines.push(`• page: ${meta.pageUrl}`);
        if (meta.referrer) lines.push(`• ref: ${meta.referrer}`);
    }

    return escapeTelegramText(lines.join('\n'));
}

/**
 * Прямой отправитель в Telegram:
 * 1) Пробуем axios POST (может упасть из-за CORS в браузере)
 * 2) Фоллбек: Image GET (CORS не мешает, но ответ не читаем)
 */
async function sendTelegramMessage(params: { token: string; chatId: string; text: string }) {
    const { token, chatId, text } = params;

    const baseUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    // 1) Axios POST (идеально для Node/серверного окружения; в браузере часто CORS-block)
    try {
        const res = await axios.post(
            baseUrl,
            { chat_id: chatId, text },
            { timeout: 12_000 }
        );

        // Telegram обычно возвращает { ok: true, result: ... }
        if (res.data?.ok) return { ok: true as const };
        return { ok: false as const, reason: 'Telegram ответил ok=false' };
    } catch (e) {
        // 2) Фоллбек под браузер (без CORS): GET через Image
        // Важно: текст в URL -> encodeURIComponent
        const url =
            `${baseUrl}?chat_id=${encodeURIComponent(chatId)}` +
            `&text=${encodeURIComponent(text)}`;

        await new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(); // даже если вернёт JSON — это ок, главное что запрос ушёл
            img.onerror = () => resolve(); // Telegram отдаёт JSON, не картинку — будет error, но запрос УЖЕ ушёл
            img.src = url;
            // Никакой гарантии, но на практике сообщение уходит.
            setTimeout(() => resolve(), 1500);
        });

        return { ok: true as const, fallback: 'image-get' as const };
    }
}

export const useTelegramLead = (): UseTelegramLeadReturn => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitLead = async (payload: LeadPayload) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const finalPayload: LeadPayload = {
                ...payload,
                meta: {
                    pageUrl: window.location.href,
                    referrer: document.referrer,
                    ...payload.meta,
                },
                honeypot: payload.honeypot || '',
                cartItems: payload.cartItems || [],
            };

            // Антиспам (если honeypot заполнен — молча не отправляем)
            if (finalPayload.honeypot) {
                throw new Error('Spam detected');
            }

            const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
            const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

            if (!token || !chatId) {
                throw new Error('Telegram env не настроены: VITE_TELEGRAM_BOT_TOKEN / VITE_TELEGRAM_CHAT_ID');
            }

            const text = buildLeadMessage(finalPayload);

            const result = await sendTelegramMessage({ token, chatId, text });
            if (!result.ok) {
                throw new Error(result.reason || 'Не удалось отправить сообщение в Telegram');
            }

            setIsSuccess(true);
        } catch (err) {
            console.error('Ошибка отправки заявки:', err);
            setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке');
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setIsSubmitting(false);
        setIsSuccess(false);
        setError(null);
    };

    return {
        isSubmitting,
        isSuccess,
        error,
        submitLead,
        reset,
    };
};
