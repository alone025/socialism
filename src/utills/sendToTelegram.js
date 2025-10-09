
const TELEGRAM_BOT_TOKEN = '8308735815:AAEhfQtlki0tyZpZTy3BlOFPlepeLra1rkk'; // Replace with your bot token
const TELEGRAM_CHAT_ID = '8308735815'; // Replace with your chat ID

// Function to send message to Telegram
export const sendToTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
};