// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Request the app to expand to full size
Telegram.WebApp.expand();

// Get elements
const usernameDisplay = document.getElementById('username');
const scoreDisplay = document.getElementById('score');
const inviteButton = document.getElementById('invite-button');
const copyLinkButton = document.getElementById('copy-link-button');
const friendsList = document.getElementById('friendsList');

// Initialize variables
let user = Telegram.WebApp.initDataUnsafe?.user || null;
let score = parseInt(localStorage.getItem('score')) || 0;
let referrals = JSON.parse(localStorage.getItem('referrals')) || [];
const referralReward = 100;
const inviteLink = `https://t.me/betaaliens_bot?start=${user?.id}`; // Use your bot's username

// Display the username and score if authenticated
if (user) {
    const username = user.username || 'User';
    usernameDisplay.textContent = username;
    localStorage.setItem('username', username); // Save username in localStorage

    // Display the score
    scoreDisplay.textContent = score;

    // Display the invited friends from localStorage
    displayInvitedFriends();

    console.log('User Info:', user); // Debugging: log user info
} else {
    console.error('User data not available.');
}

// Invite friends via Telegram dialog
inviteButton.addEventListener('click', () => {
    Telegram.WebApp.openTelegramLink(`https://t.me/betaaliens_bot?start=${user.id}`); // Use your bot's username
});

// Copy the invite link to the clipboard
copyLinkButton.addEventListener('click', () => {
    navigator.clipboard.writeText(inviteLink)
        .then(() => {
            alert('Invite link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy invite link: ', err);
        });
});

// Function to track referral when the invited friend launches the game
function trackReferral(friendId) {
    if (!referrals.includes(friendId)) {
        referrals.push(friendId);
        localStorage.setItem('referrals', JSON.stringify(referrals));
        updateScore(referralReward); // Reward player with 100 aliens
        displayInvitedFriends();
    }
}

// Update the score and save it in localStorage
function updateScore(amount) {
    score += amount;
    scoreDisplay.textContent = score;
    localStorage.setItem('score', score);
}

// Display the invited friends list
function displayInvitedFriends() {
    friendsList.innerHTML = ''; // Clear the list first
    referrals.forEach(friend => {
        let friendItem = document.createElement('div');
        friendItem.className = 'friend-item';
        friendItem.textContent = `Friend ID: ${friend}`; // Display friend ID (or customize)
        friendsList.appendChild(friendItem);
    });
}

// Simulate referral tracking (this would normally be handled by the backend or bot)
// Example: A friend launches the game with a referral link
function simulateReferral(friendId) {
    trackReferral(friendId);
}

// Example of simulating a referral (remove or replace in actual usage)
// Simulate a referral with friend ID 12345
simulateReferral(12345);
