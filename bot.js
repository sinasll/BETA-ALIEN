const TelegramBot = require('node-telegram-bot-api');

const token = '7939954803:AAG2d3N4hvKlIW3O2tgF95W0TSVOGKY0Cws'; // Your bot token
const bot = new TelegramBot(token, { polling: true });

// Listen for the /start command
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    // Get the username from the message
    const username = msg.from.username ? `@${msg.from.username}` : '@username'; // Default to @username if not available
    const userId = msg.from.id; // Get user ID

    // Fetch user information to get the account creation date
    const userInfo = await bot.getChat(userId);
    const creationDate = new Date(userInfo.date * 1000); // Convert from seconds to milliseconds
    const accountAgeDays = calculateAccountAge(creationDate); // Calculate the account age in days

    // Create buttons for Web App and Join Community
    const inlineKeyboard = [
        [
            {
                text: "Launch ALIENS 👾", // Button text
                web_app: { url: "https://sinasll.github.io/BETA-ALIEN/main.html?username=" + encodeURIComponent(username) + "&accountAge=" + accountAgeDays } // URL to your Web App with query parameters
            }
        ],
        [
            {
                text: "Join Community 🌐", // Button text
                url: "https://your-community-link.com" // Replace with your community link
            }
        ]
    ];

    // Send a message with the buttons
    bot.sendMessage(chatId, `🛸 Welcome to ALIENS! Your Galactic Adventure Begins Here 👽

Prepare to explore the universe, conquer new challenges, and earn cosmic rewards.
But that’s not all—an exclusive airdrop is coming soon! 🌠`, {
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    });
});

// Function to calculate account age in days
function calculateAccountAge(creationDate) {
    const currentDate = new Date();
    const timeDifference = currentDate - creationDate; // in milliseconds
    return Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days
}

// Log errors if any
bot.on("polling_error", (error) => {
    console.error(error); // Log any polling errors
});
