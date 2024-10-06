// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Request the app to expand to full size
Telegram.WebApp.expand();

// Check if the user is authenticated via Telegram
const user = Telegram.WebApp.initDataUnsafe?.user || null;

if (user) {
    // Display the user's Telegram username in the HTML
    const usernameDisplay = document.getElementById('usernameDisplay');
    const username = user.username || 'User'; // Fallback if username is not available
    usernameDisplay.textContent = `${username}`;

    // Save the username in localStorage for future use
    localStorage.setItem('username', username);
    
    // Fetch and display score from localStorage
    fetchUserScore();
    
    console.log('User Info:', user); // Debugging: log user info
} else {
    console.error('User data not available. Please ensure Telegram authentication.');
}

// Adjust the app height to the full available viewport height
document.documentElement.style.height = Telegram.WebApp.viewportHeight + 'px';

// Function to fetch user score from local storage
function fetchUserScore() {
    // Retrieve the score from localStorage
    let userScore = parseInt(localStorage.getItem('score')) || 0; // Default score if not found
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = userScore; // Display the score
}

// Function to increase and update the score
function increaseScore(amount) {
    let currentScore = parseInt(document.getElementById('score').textContent, 10);
    currentScore += amount;
    document.getElementById('score').textContent = currentScore;

    // Save the updated score in localStorage
    localStorage.setItem('score', currentScore);
}

// Fetch user score only if authenticated
if (user) {
    fetchUserScore();
}
