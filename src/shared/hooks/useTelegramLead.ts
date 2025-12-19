import { useState } from 'react';

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

/**
 * Единый хук для отправки заявок в Telegram
 * Используется во всех формах приложения
 */
export const useTelegramLead = (): UseTelegramLeadReturn => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitLead = async (payload: LeadPayload) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Автоматически добавляем метаданные, если не указаны
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

            // В dev mode используем mock (console.log)
            const isDev = import.meta.env.DEV;

            if (isDev) {
                console.log('📨 Заявка (DEV MODE - Telegram не отправляется):');
                console.log(JSON.stringify(finalPayload, null, 2));

                // Симулируем задержку сети
                await new Promise(resolve => setTimeout(resolve, 1000));

                setIsSuccess(true);
                return;
            }

            // В production используем реальный API
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalPayload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.status === 'success' || result.status === 'ok') {
                setIsSuccess(true);
            } else {
                throw new Error('Неизвестный статус ответа');
            }
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