document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");
    const scoreElement = document.getElementById("score");
    const claimButtons = document.querySelectorAll(".claim-button");

    // Fetch username and score
    getTelegramDetails();

    // Initialize claim button states
    claimButtons.forEach(button => {
        const taskId = button.getAttribute("data-task-id");
        const taskClaimed = localStorage.getItem(`claimed_${taskId}`);

        // Disable the button if the task has already been claimed
        if (taskClaimed === 'true') {
            button.textContent = "Claimed";
            button.disabled = true;
        }

        // Add event listener to handle claiming
        button.addEventListener("click", function () {
            // Check if the task is already claimed
            if (localStorage.getItem(`claimed_${taskId}`) !== 'true') {
                let score = parseInt(localStorage.getItem("score")) || 0;
                score += 100;  // Rewarding 100 points per task

                // Save the new score to localStorage
                localStorage.setItem("score", score);

                // Mark the task as claimed in localStorage
                localStorage.setItem(`claimed_${taskId}`, 'true');

                // Update the score display with commas for thousand separators
                scoreElement.textContent = `${parseInt(score).toLocaleString()} ALIENS`;

                // Disable the button and change text to "Claimed"
                button.textContent = "Claimed";
                button.disabled = true;
            }
        });
    });

    function getTelegramDetails() {
        let username = localStorage.getItem("username");
        let accountCreationDate = localStorage.getItem("accountCreationDate");
        let score = localStorage.getItem("score");

        // Check for username in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlUsername = urlParams.get('username');

        // Use username from URL if available, otherwise prompt for it
        if (urlUsername) {
            username = urlUsername;
            localStorage.setItem("username", username);
        } else if (!username) {
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

        // Calculate score if not already set
        if (!score) {
            score = ageInDays * 10; // 10 points for each day
            localStorage.setItem("score", score);
        } else {
            // If score already exists, ensure it’s up-to-date
            score = parseInt(score, 10);
        }

        // Format and display the username and score
        usernameElement.textContent = username;
        scoreElement.textContent = `${score.toLocaleString()} ALIENS`;
    }
});
