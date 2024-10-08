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

/. Please ensure Telegram authentication.');
}

// Function to increase the user's score and save it to localStorage
function increaseScore(amount) {
    let currentScore = parseInt(document.getElementById('score').textContent, 10);
    currentScore += amount;
    document.getElementById('score').textContent = currentScore;

    // Save the updated score to localStorage
    localStorage.setItem('score', currentScore); // Store the score in localStorage
}

// Call the function to initialize user score
fetchUserScore();
