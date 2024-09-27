// Function to fetch user info from Telegram
function fetchTelegramUserInfo() {
    const usernameElement = document.getElementById('username'); // Get the username element
    usernameElement.textContent = "Loading..."; // Show loading message

    // Check if the Telegram Web App API is available
    if (window.Telegram && window.Telegram.WebApp) {
        const userInfo = window.Telegram.WebApp.initDataUnsafe.user; // Get user data

        // Validate userInfo object exists
        if (userInfo) {
            // Check if the user has a username
            if (userInfo.username) {
                // If the username exists, display it
                usernameElement.textContent = `Username: @${userInfo.username}`; // Display username
            } else if (userInfo.first_name) {
                // If the username does not exist, fallback to displaying the first name
                usernameElement.textContent = `Name: ${userInfo.first_name}`; // Fallback to first name
            } else {
                // If neither username nor first name exists
                usernameElement.textContent = "Name: Unknown"; // Display fallback message
            }
        } else {
            // If userInfo is not available
            usernameElement.textContent = "User information is not available.";
        }
    } else {
        // If Telegram Web App API is not available
        usernameElement.textContent = "Open in Telegram";
    }
}

// Call the function to fetch and display the user's information
fetchTelegramUserInfo();
