// Function to fetch user info from Telegram
function fetchTelegramUserInfo() {
    const userInfo = window.Telegram.WebApp.initDataUnsafe.user; // Get user data
    const usernameElement = document.getElementById('username');

    // Check if the user has a username
    if (userInfo.username) {
        usernameElement.textContent = `Username: @${userInfo.username}`; // Display username
    } else {
        usernameElement.textContent = `Name: ${userInfo.first_name}`; // Fallback to first name
    }
}

// Call the function to fetch and display the user's information
fetchTelegramUserInfo();
