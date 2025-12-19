// Netlify Serverless Function для отправки заявок в Telegram

export default async (request, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers,
    });
  }

  try {
    // Parse request body
    const payload = await request.json();
    const { contact, cartItems = [], meta = {}, honeypot = '' } = payload;

    // Honeypot check
    if (honeypot) {
      console.log('🍯 Honeypot triggered, ignoring');
      return new Response(JSON.stringify({ status: 'success', message: 'Ignored (honeypot)' }), {
        status: 200,
        headers,
      });
    }

    // Get Telegram credentials from environment
    const TELEGRAM_BOT_TOKEN = Netlify.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Netlify.env.get('TELEGRAM_CHAT_ID');

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram credentials not configured');
      return new Response(JSON.stringify({
        error: 'Telegram not configured',
        details: 'TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set in environment variables'
      }), {
        status: 500,
        headers,
      });
    }

    // Format message
    let message = '🌳 *Новая заявка с сайта*\n\n';

    // Contact info
    message += `👤 *Контакт*\n`;
    message += `Имя: ${contact.name}\n`;
    message += `Телефон: ${contact.phone}\n`;
    if (contact.preferredChannel) {
      message += `Способ связи: ${contact.preferredChannel}\n`;
    }
    if (contact.comment) {
      message += `Комментарий: ${contact.comment}\n`;
    }

    // Cart items
    if (cartItems && cartItems.length > 0) {
      message += `\n🛒 *Корзина* (${cartItems.length} товаров)\n`;
      let total = 0;
      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        message += `${index + 1}. ${item.title}\n`;
        message += `   ${item.qty} x ${item.price.toLocaleString()} = ${itemTotal.toLocaleString()} сум\n`;
      });
      message += `\n💰 *Итого:* ${total.toLocaleString()} сум\n`;
    }

    // Meta info
    if (meta.source) {
      message += `\n📍 Источник: ${meta.source}\n`;
    }
    if (meta.pageUrl) {
      message += `🔗 URL: ${meta.pageUrl}\n`;
    }

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      console.error('❌ Telegram API error:', telegramData);
      return new Response(JSON.stringify({
        error: 'Failed to send to Telegram',
        details: telegramData.description
      }), {
        status: 500,
        headers,
      });
    }

    console.log('✅ Message sent to Telegram');
    return new Response(JSON.stringify({
      status: 'success',
      message: 'Lead submitted successfully'
    }), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('❌ Error processing request:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers,
    });
  }
};