window.onload = function() {
    // Check if Telegram WebApp is initialized
    if (Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            // Set the username with the Telegram username
            document.getElementById("username").textContent = "@" + user.username;
        }
    } else {
        console.error("Telegram WebApp is not available.");
    }
};
