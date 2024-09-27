document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");
    const scoreElement = document.getElementById("score");

    // Fetch username and score
    getTelegramDetails();

    function getTelegramDetails() {
        let username = localStorage.getItem("username");
        let telegramAccountAge = localStorage.getItem("telegramAccountAge");
        let score = localStorage.getItem("score");

        // Prompt for username if not set
        if (!username) {
            username = prompt("Please enter your Telegram username:");
            if (username) {
                localStorage.setItem("username", username);
            } else {
                alert("Username is required!");
                return;
            }
        }

        // Calculate account age and score if not already set
        if (!telegramAccountAge) {
            telegramAccountAge = prompt("Please enter the number of days your Telegram account has existed:");
            if (telegramAccountAge) {
                localStorage.setItem("telegramAccountAge", telegramAccountAge);
            } else {
                alert("Telegram account age is required!");
                return;
            }
        }

        // Calculate score (10 points for each day)
        if (!score) {
            score = telegramAccountAge * 10;
            localStorage.setItem("score", score);
        }

        // Format the score with commas
        usernameElement.textContent = username;
        scoreElement.textContent = `${parseInt(score).toLocaleString()} ALIENS`;
    }
});
