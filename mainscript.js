// main.js
document.addEventListener('DOMContentLoaded', () => {
    const telegram = window.Telegram.WebApp;

    // Fetch username from Telegram Web App
    const username = telegram.initDataUnsafe.user?.username || '@username';
    document.getElementById('username').textContent = username;

    // Initialize score from localStorage or set to 0 if not found
    let score = parseInt(localStorage.getItem('score')) || 0;
    document.getElementById('score').textContent = score;

    // Save username to localStorage (optional)
    localStorage.setItem('username', username);

    // Function to update the score
    window.updateScore = function(points) {
        score += points;
        localStorage.setItem('score', score);
        document.getElementById('score').textContent = score;
    };
});
