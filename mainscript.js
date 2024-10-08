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

// Call the function to initialize user score
fetchUserScore();
