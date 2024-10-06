// Display user data if authenticated
const user = Telegram.WebApp.initDataUnsafe?.user || null;

if (user) {
    // Display the user's Telegram username in the HTML
    const usernameDisplay = document.getElementById('usernameDisplay');
    const username = user.username || 'unknown alien'; // Use username or fallback to 'unknown alien'
    usernameDisplay.textContent = username;

    // Save the username in localStorage
    localStorage.setItem('username', username);

    console.log('User Info:', user); // Debugging: log user info
} else {
    console.error('User data not available.');
}

// Adjust the app height to the full available viewport height
document.documentElement.style.height = Telegram.WebApp.viewportHeight + 'px';

// Function to fetch user score from localStorage
function fetchUserScore() {
    // Retrieve the score from localStorage, or default to 0 if not set
    let userScore = parseInt(localStorage.getItem('score'), 10) || 0; // Default score is 0
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = userScore; // Display the score
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
