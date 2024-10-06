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

    // Debugging: Log user info to ensure the user object is correctly populated
    console.log('User Info:', user);
} else {
    console.error('User data not available. Please ensure Telegram authentication.');
    console.log('Telegram WebApp Data:', Telegram.WebApp.initDataUnsafe); // Log init data for debugging
}

// Adjust the app height to the full available viewport height
function adjustViewportHeight() {
    document.body.style.height = `${Telegram.WebApp.viewportHeight}px`;
}

// Call the function initially and on resize
adjustViewportHeight();
window.addEventListener('resize', adjustViewportHeight);

// Function to fetch user score from local storage
function fetchUserScore() {
    // Retrieve the score from localStorage
    let userScore = parseInt(localStorage.getItem('score')) || 0; // Default score if not found
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = userScore; // Display the score

    // Debugging: Log the score to ensure it's fetched correctly
    console.log('User Score:', userScore);
}

// Function to increase and update the score
function increaseScore(amount) {
    let currentScore = parseInt(document.getElementById('score').textContent, 10);
    currentScore += amount;
    document.getElementById('score').textContent = currentScore;

    // Save the updated score in localStorage
    localStorage.setItem('score', currentScore);

    // Debugging: Log the updated score
    console.log('Updated Score:', currentScore);
}

// Debugging: Check localStorage to ensure username and score are correctly saved
console.log('Username in localStorage:', localStorage.getItem('username'));
console.log('Score in localStorage:', localStorage.getItem('score'));

// Only fetch the score if the user is authenticated
if (user) {
    fetchUserScore();
}
