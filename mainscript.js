// mainscript.js

// Function to fetch the username from Telegram
async function fetchUsername() {
    try {
        // Using your actual Telegram bot token
        const response = await fetch(`https://api.telegram.org/bot7350557281:AAHDt0zRKcBaWo2a2XDdc-ViwB-N2H6ZeVo/getMe`);
        const data = await response.json();
        
        // Check if the username is available
        const username = data.result.username; // Get the username
        document.getElementById('username').textContent = username ? username : ''; // Display username or leave empty
    } catch (error) {
        console.error('Error fetching username:', error);
        document.getElementById('username').textContent = ''; // Leave empty in case of error
    }
}

// Call the function to fetch the username when the page loads
fetchUsername();
