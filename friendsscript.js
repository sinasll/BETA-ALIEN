// friendsscript.js
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Invite Friends button event listener
    document.getElementById('invite-button').addEventListener('click', () => {
        const miniAppUrl = 'https://sinasll.github.io/BETA-ALIEN/';
        const message = `Hey! Check out this cool mini app: ${miniAppUrl}`;
        
        // Create a Telegram sharing link
        const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(miniAppUrl)}&text=${encodeURIComponent(message)}`;
        window.open(telegramLink, '_blank'); // Open the Telegram link in a new tab
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
