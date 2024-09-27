// Function to format the score with commas
function formatScore(score) {
    return score.toLocaleString(); // Adds commas based on the locale
}

// Function to calculate the user's score based on account age
function calculateScore(creationDate) {
    const currentDate = new Date();
    const accountAgeInMilliseconds = currentDate - new Date(creationDate);
    const accountAgeInDays = Math.floor(accountAgeInMilliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    const scorePerDay = 10; // Score per day

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
        return null; // Return null if the fetch fails
    }
}

// Function to retrieve the user's Telegram username via API
async function getTelegramUsername() {
    try {
        const response = await fetch('/api/getTelegramUsername'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const username = data.username || "unknown"; // Assuming the API returns a JSON object with the username
        document.getElementById("username").innerText = "@" + username; // Display the username with '@'
        
        // Save the username to local storage
        localStorage.setItem('telegramUsername', username);
    } catch (error) {
        console.error('Error fetching Telegram username:', error);
        document.getElementById("username").innerText = "@unknown"; // Default if fetch fails
    }
}

// Function to update the score display and save the username and score in local storage
async function updateScoreDisplay() {
    const creationDate = await getAccountCreationDate(); // Retrieve the creation date
    if (creationDate) {
        const score = calculateScore(creationDate); // Calculate score
        document.getElementById('score').textContent = formatScore(score); // Display formatted score

        // Save the score to local storage
        localStorage.setItem('userScore', score);
    } else {
        // Handle the case where the creation date could not be fetched
        document.getElementById('score').textContent = formatScore(0); // Display 0 if no valid date
    }
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
    await getTelegramUsername(); // Set the username
    await updateScoreDisplay(); // Update the score display
};
