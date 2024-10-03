// friendsscript.js

// Update username and score from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;
});

// Invite friends via Telegram message
function inviteFriends() {
    Telegram.WebApp.showPopup({
        title: 'Invite Friends',
        message: 'Send an invite link to your friends!',
        buttons: [
            { id: 'share', type: 'ok', text: 'Share' },
        ],
        onButtonClick: (buttonId) => {
            if (buttonId === 'share') {
                Telegram.WebApp.shareText('Join the game on Telegram! @betaaliens_bot');
            }
        }
    });
}

// Copy invite link to clipboard
function copyInviteLink() {
    const inviteLink = "@betaaliens_bot";
    navigator.clipboard.writeText(inviteLink).then(() => {
        alert('Invite link copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}
