// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Display user data if authenticated
const initData = Telegram.WebApp.initData || '';
const user = Telegram.WebApp.initDataUnsafe?.user || null;

if (user) {
    // Display the user's Telegram first name in the HTML
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = `${user.username || unknown alien}!`;
    console.log('User Info:', user); // Debugging: log user info
} else {
    console.error('User data not available.');
}

// Function to fetch user score (if stored in a backend or local storage)
function fetchUserScore() {
    // You could call your backend here to retrieve user data
    // For now, it just sets a default score of 0
    let userScore = 0; // Placeholder score logic
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = userScore;
}

// Example of future game logic (e.g., increase score on an action)
function increaseScore(amount) {
    let currentScore = parseInt(document.getElementById('score').textContent, 10);
    currentScore += amount;
    document.getElementById('score').textContent = currentScore;

    // You could also save this score to a backend or local storage
}

// Call the function to initialize user score
fetchUserScore();
