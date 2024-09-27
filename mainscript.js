window.Telegram.WebApp.ready();  // Initialize the Telegram Web App

const usernameDiv = document.getElementById('username');

// Get the user data from Telegram Web App
const user = Telegram.WebApp.initDataUnsafe.user;

if (user) {
    if (user.username) {
        // Display the Telegram username if it's available
        usernameDiv.textContent = `Welcome, ${user.username}!`;
    } else {
        // If no username, prompt the user to create one
        usernameDiv.textContent = 'Please set a username in your Telegram settings to continue.';
        Telegram.WebApp.showPopup({
            title: "Username Required",
            message: "You need to set a username in your Telegram settings to proceed.",
            buttons: [
                { id: "ok", type: "ok", text: "OK" }
            ]
        });
    }
} else {
    usernameDiv.textContent = 'Error: Unable to retrieve user data.';
}
