const { z } = require('zod');

// Netlify/Vercel serverless function to handle lead submissions and forward them to Telegram.

const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  preferredChannel: z.string().optional(),
  comment: z.string().optional(),
});

const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  qty: z.number().int().positive(),
  price: z.number().nonnegative(),
});

const payloadSchema = z.object({
  contact: contactSchema,
  cartItems: z.array(cartItemSchema),
  meta: z.any(),
  honeypot: z.string(),
});

/**
 * Constructs a Telegram message in Markdown format based on the lead payload.
 * @param {object} payload
 */
function buildMessage(payload) {
  const { contact, cartItems, meta } = payload;
  const lines = [];
  lines.push('*Новая заявка*');
  lines.push(`*Имя:* ${contact.name}`);
  lines.push(`*Телефон:* ${contact.phone}`);
  if (contact.preferredChannel) {
    lines.push(`*Способ связи:* ${contact.preferredChannel}`);
  }
  if (contact.comment) {
    lines.push(`*Комментарий:* ${contact.comment}`);
  }
  if (cartItems.length > 0) {
    lines.push('\n*Состав заказа:*');
    cartItems.forEach((item) => {
      lines.push(`- ${item.title} × ${item.qty} = ${item.price * item.qty}`);
    });
    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    lines.push(`*Сумма:* ${total}`);
  } else {
    lines.push('\n*Состав заказа:* товары не выбраны');
  }
  if (meta && meta.pageUrl) {
    lines.push(`\n*Страница:* ${meta.pageUrl}`);
  }
  if (meta && meta.referrer) {
    lines.push(`*Referrer:* ${meta.referrer}`);
  }
  lines.push(`*Время:* ${new Date().toLocaleString()}`);
  return lines.join('\n');
}

async function sendToTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('Telegram credentials are missing');
    return;
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });
  if (!res.ok) {
    console.error('Telegram API error', await res.text());
  }
}

// For Netlify
exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body || '{}');
    const parsed = payloadSchema.parse(data);
    // Honeypot check
    if (parsed.honeypot && parsed.honeypot !== '') {
      return { statusCode: 200, body: JSON.stringify({ status: 'ok' }) };
    }
    // Rate limiting can be implemented here using context.clientContext.ip
    const message = buildMessage(parsed);
    await sendToTelegram(message);
    return { statusCode: 200, body: JSON.stringify({ status: 'success' }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid payload' }) };
  }
};

// For Vercel (if deployed there)
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Method not allowed' });
    return;
  }
  try {
    const parsed = payloadSchema.parse(req.body);
    if (parsed.honeypot && parsed.honeypot !== '') {
      return res.status(200).json({ status: 'ok' });
    }
    const message = buildMessage(parsed);
    await sendToTelegram(message);
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Invalid payload' });
  }
};