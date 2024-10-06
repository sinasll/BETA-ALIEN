// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Request the app to expand to full size
Telegram.WebApp.expand();

// Display user data if authenticated
const user = Telegram.WebApp.initDataUnsafe?.user || null;

if (user) {
    // Display the user's Telegram username in the HTML
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = `@${user.username || 'unkonwn alien'}!`; // Use username or fallback to 'User'
    console.log('User Info:', user); // Debugging: log user info
} else {
    console.error('User data not available.');
}

// Adjust the app height to the full available viewport height
document.documentElement.style.height = Telegram.WebApp.viewportHeight + 'px';

// Function to fetch user score (if stored in a backend or local storage)
function fetchUserScore() {
    // Placeholder for actual score retrieval logic
    let userScore = 0; // Default score
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = userScore;
}

// Example of future game logic (e.g., increase score on an action)
function increaseScore(amount) {
    let currentScore = parseInt(document.getElementById('score').textContent, 10);
    currentScore += amount;
    document.getElementById('score').textContent = currentScore;

    // Save this score to a backend or local storage in the future
}

// Call the function to initialize user score
fetchUserScore();
