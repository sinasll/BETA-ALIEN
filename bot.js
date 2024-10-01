// Load environment variables from .env file
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Use the bot token from the .env file
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Handle when the user sends any message
bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // Get the user's username
    const username = msg.from.username || msg.from.first_name || 'User';

    console.log(`User accessed the bot: ${username}`);

    // Create buttons for Web App and Join Community
    const inlineKeyboard = [
        [
            {
                text: "Launch ALIENS 👾", // Button text
                web_app: { url: "https://sinasll.github.io/BETA-ALIEN/main.html" } // URL to your Web App
            }
        ],
        [
            {
                text: "Join Community 🌐", // Button text
                url: "https://your-community-link.com" // Replace with your community link
            }
        ]
    ];

    // Send a message with the buttons only when the user sends a message
    bot.sendMessage(chatId, `🛸 Welcome to ALIENS, ${username}! Your Galactic Adventure Begins Here 👽

Prepare to explore the universe, conquer new challenges, and earn cosmic rewards.
But that’s not all—an exclusive airdrop is coming soon! 🌠`, {
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    });
});

// Handle when the user changes status in the bot (e.g., starts or stops the bot)
bot.on('my_chat_member', (msg) => {
    const chatId = msg.chat.id;
    const status = msg.new_chat_member.status;

    // Get the user's username
    const username = msg.from.username || msg.from.first_name || 'User';

    if (status === 'member') {
        // User started the bot, get the username and log it
        console.log(`User started the bot: ${username}`);
    } else if (status === 'kicked') {
        console.log(`User stopped the bot: ${username}`);
    }
});

// Handle when the user clicks a menu button
bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const username = callbackQuery.from.username || callbackQuery.from.first_name || 'User';

    // Log the username when they click a button
    console.log(`User clicked a menu button: ${username}`);
});

// Log errors if any
bot.on("polling_error", (error) => {
    console.error(error); // Log any polling errors
});
