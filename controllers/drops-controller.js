import Drop from "../models/drop.js";



const sendMessage = async (req, res) => {
  try {
    console.log('req.body ==>> ', req.body )
    // const { name, number } = req.body;

    const nickname = req.body?.nickname;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    // const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const obj = await Drop.find({ nickname })
    const telegramChatId = obj[0].chatID

    // if (!name || !number) {
    //   return res.status(400).json({ error: 'Name and number are required fields' });
    // }

    const textArr = []

    for (const key in req.body) {
      if (Object.hasOwnProperty.call(req.body, key)) {
        const element = req.body[key];
        if (key !== 'nickname') {
          textArr.push(`${key}: ${element}, `)
        }
        
      }
    }

    // Отправляем сообщение в Telegram
    const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: telegramChatId, text: `${textArr.join("\n")}` }),
    });

    const data = await response.json();
    if (data.ok) {
      return res.json({ message: 'Message sent successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to send message to Telegram' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default {
  sendMessage
}