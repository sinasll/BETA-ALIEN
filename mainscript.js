// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Request the app to expand to full size
Telegram.WebApp.expand();

// Display user data if authenticated
const user = Telegram.WebApp.initDataUnsafe?.user || null;

if (user) {
    // Display the user's Telegram username in the HTML
    const usernameDisplay = document.getElementById('usernameDisplay');
    const username = user.username || 'User'; // Fallback if username is not available
    usernameDisplay.textContent = `${username}`;

    // Save the username in localStorage
    localStorage.setItem('username', username);
    
    // Fetch and display score from localStorage
    fetchUserScore();
    
    console.log('User Info:', user); // Debugging: log user info
} else {
    console.error('User data not available.');
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

// Example of future game logic (e.g., increase score on an action)
function increaseScore(amount) {
    let currentScore = parseInt(document.getElementById('score').textContent, 10);
    currentScore += amount;
    document.getElementById('score').textContent = currentScore;

    // Save this score to local storage
    localStorage.setItem('score', currentScore);
}

// Call the function to initialize user score only if user is authenticated
if (user) {
    fetchUserScore();
}
