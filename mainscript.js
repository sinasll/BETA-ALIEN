window.addEventListener('DOMContentLoaded', function () {
    // Initialize the Telegram Web App
    const tg = window.Telegram.WebApp;

    // Automatically get the user's Telegram username
    const user = tg.initDataUnsafe.user;

    if (user && user.username) {
        // Display the username
        document.getElementById('username').textContent = `@${user.username}`;
    } else {
        // Fallback message if the username is not available
        document.getElementById('username').textContent = 'Unknown User';
    }

    // Expand the Web App to full screen
    tg.expand();
});
