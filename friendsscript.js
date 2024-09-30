// friendsscript.js
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Function to send a message via Telegram Bot
    const sendTelegramMessage = (chatId, message) => {
        const botToken = '7939954803:AAG2d3N4hvKlIW3O2tgF95W0TSVOGKY0Cws'; // Your bot's API token
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML', // Optional: Allows formatting with HTML
            }),
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message.');
                console.error('Error:', response.statusText);
            }
        })
        .catch(err => {
            console.error('Could not send message:', err);
        });
    };

    // Invite Friends button event listener
    document.getElementById('invite-button').addEventListener('click', () => {
        const miniAppUrl = 'https://sinasll.github.io/BETA-ALIEN/';
        const message = `Hey! Check out this cool mini app: ${miniAppUrl}`;
        
        // Prompt the user for the chat ID where the message should be sent
        const chatId = prompt("Enter your Telegram chat ID to send the message:");
        if (chatId) {
            sendTelegramMessage(chatId, message);
        } else {
            alert('Chat ID is required to send the message.');
        }
    });

    // Copy Invite Link button event listener
    document.getElementById('copy-link-button').addEventListener('click', () => {
        const inviteLink = 'https://sinasll.github.io/BETA-ALIEN/'; // Replace with your mini app URL
        navigator.clipboard.writeText(inviteLink).then(() => {
            alert('Invite link copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
});
