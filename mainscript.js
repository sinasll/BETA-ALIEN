// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Request the app to expand to full size
Telegram.WebApp.expand();

// Function to retrieve Telegram username
function getTelegramUserData() {
    const telegram = window.Telegram.WebApp;

    // When Telegram WebApp is ready, fetch the user's info
    telegram.ready();
    const user = telegram.initDataUnsafe.user;

    // If the user exists, display their username
    if (user) {
        document.getElementById('usernameDisplay').textContent = `Welcome, ${user.first_name}!`;
    } else {
        document.getElementById('usernameDisplay').textContent = 'Welcome, Player!';
    }
}

// Function to get the score from localStorage or initialize it to 0
function getScore() {
    let score = localStorage.getItem('alienScore');
    
    // If score is not found, initialize it to 0
    if (!score) {
        score = 0;
        localStorage.setItem('alienScore', score);
    }

    document.getElementById('score').textContent = score;
}

// Function to update the score and save it in localStorage
function updateScore(newScore) {
    localStorage.setItem('alienScore', newScore);
    document.getElementById('score').textContent = newScore;
}

// Call the functions to load user data and score when the page loads
document.addEventListener('DOMContentLoaded', function() {
    getTelegramUserData();
    getScore();
});

// Example: updating the score (for demonstration purposes)
// You can modify this to update based on game mechanics
document.querySelector('.get-button').addEventListener('click', function() {
    let currentScore = parseInt(localStorage.getItem('alienScore'), 10);
    const newScore = currentScore + 10; // Increment score by 10
    updateScore(newScore);
});
