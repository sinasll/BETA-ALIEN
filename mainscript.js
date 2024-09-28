const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = '7350557281:AAHDt0zRKcBaWo2a2XDdc-ViwB-N2H6ZeVo'; // Your API token

app.use(bodyParser.json());

// Endpoint to receive updates from Telegram
app.post('/webhook', (req, res) => {
    const { message } = req.body;

    if (message && message.chat) {
        const chatId = message.chat.id;
        const username = message.chat.username || message.chat.first_name;

        // Log the username or first name
        console.log(`Username: ${username}`);

        // Send a message back to the user (optional)
        axios.post(`https://api.telegram.org/bot${7350557281:AAHDt0zRKcBaWo2a2XDdc-ViwB-N2H6ZeVo}/sendMessage`, {
            chat_id: chatId,
            text: `Hello, ${username}! Welcome to ALIENS!`
        });
    }

    res.sendStatus(200);
});

// Set webhook (do this once)
// Uncomment this line to set the webhook when you first run the server
// axios.post(`https://api.telegram.org/bot${7350557281:AAHDt0zRKcBaWo2a2XDdc-ViwB-N2H6ZeVo}/setWebhook`, {
//     url: `https://sinasll.github.io/BETA-ALIEN//webhook` // Replace with your server URL
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
