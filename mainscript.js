document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");
    const scoreElement = document.getElementById("score");

    // Fetch username and score
    getTelegramDetails();

    function getTelegramDetails() {
        let username = localStorage.getItem("username");
        let accountCreationDate = localStorage.getItem("accountCreationDate");
        let score = localStorage.getItem("score");

        // Check for username in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlUsername = urlParams.get('username');

        // Use username from URL if available
        if (urlUsername) {
            username = urlUsername.replace('@', ''); // Remove '@' if included
            localStorage.setItem("username", username);
        } else if (!username) {
            // If no username is stored or provided, prompt for it
            username = prompt("Please enter your Telegram username:");
            if (username) {
                localStorage.setItem("username", username);
            } else {
                alert("Username is required!");
                return;
            }
        }

        // Set account creation date if not already set
        if (!accountCreationDate) {
            accountCreationDate = new Date().toISOString(); // Save the current date as the account creation date
            localStorage.setItem("accountCreationDate", accountCreationDate);
        }

        // Calculate the account age in days
        const today = new Date();
        const createdDate = new Date(accountCreationDate);
        const ageInDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));

        // Calculate score (10 points for each day)
        if (!score) {
            score = ageInDays * 10;
            localStorage.setItem("score", score);
        } else {
            // If score already exists, ensure it's up-to-date
            score = parseInt(score, 10);
        }

        // Format and display the score with commas
        usernameElement.textContent = username;
        scoreElement.textContent = `${score.toLocaleString()} ALIENS`;
    }
});
