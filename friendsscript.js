// friendsscript.js
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Invite Friends button event listener
    document.getElementById('invite-button').addEventListener('click', () => {
        const botUsername = '@YourBotUsername'; // Replace with your bot's username
        const message = `Hey! Check out this cool bot: ${botUsername}`;
        const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(botUsername)}&text=${encodeURIComponent(message)}`;
        window.open(telegramLink, '_blank'); // Open the Telegram link in a new tab
    });

    // Copy Invite Link button event listener
    document.getElementById('copy-link-button').addEventListener('click', () => {
        const inviteLink = `https://t.me/share/url?url=${encodeURIComponent('@YourBotUsername')}`; // Adjust as needed
        navigator.clipboard.writeText(inviteLink).then(() => {
            alert('Invite link copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
});
