// Function to format the score with commas
function formatScore(score) {
    return score.toLocaleString(); // Adds commas based on the locale
}

// Function to calculate the user's score based on account age
function calculateScore(creationDate) {
    const currentDate = new Date();
    const accountAgeInMilliseconds = currentDate - new Date(creationDate);
    const accountAgeInDays = Math.floor(accountAgeInMilliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    const scorePerDay = 10; // Example score per day

    return accountAgeInDays * scorePerDay; // Total score
}

// Function to retrieve the Telegram account creation date via API
async function getAccountCreationDate() {
    try {
        const response = await fetch('/api/getTelegramAccountCreationDate'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return new Date(data.creationDate); // Assuming the API returns a JSON object with the creationDate
    } catch (error) {
        console.error('Error fetching account creation date:', error);
        // Return a fallback date if the API call fails
        const fallbackDate = new Date();
        fallbackDate.setDate(fallbackDate.getDate() - 30); // Simulate a creation date 30 days ago
        return fallbackDate;
    }
}

// Function to set the Telegram username from a simulated automatic retrieval
function getTelegramUsername() {
    const username = "unknown"; // Changed simulated username to "unknown"
    const usernameDisplay = document.getElementById("username");

    usernameDisplay.innerText = "@" + username; // Display the username with '@'
}

// Function to update the score display and save the username and score in local storage
async function updateScoreDisplay() {
    const creationDate = await getAccountCreationDate(); // Retrieve the creation date
    const score = calculateScore(creationDate); // Calculate score
    document.getElementById('score').textContent = formatScore(score); // Display formatted score

    // Save the username and score to local storage (optional)
    localStorage.setItem('telegramUsername', "unknown"); // Change to actual username retrieval
    localStorage.setItem('userScore', score);
}

// Function to load saved username and score from local storage
function loadUserData() {
    const savedUsername = localStorage.getItem('telegramUsername');
    const savedScore = localStorage.getItem('userScore');

    if (savedUsername) {
        document.getElementById('username').innerText = "@" + savedUsername; // Display saved username
    }
    if (savedScore) {
        document.getElementById('score').textContent = formatScore(savedScore); // Display saved score
    }
}

// Call the functions on page load
window.onload = async function() {
    loadUserData(); // Load saved username and score
    getTelegramUsername(); // Set the username
    await updateScoreDisplay(); // Update the score display
};
