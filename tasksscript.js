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
                score += 100;  // Example of rewarding 100 points per task

                // Save the new score to localStorage
                localStorage.setItem("score", score);

                // Mark the task as claimed in localStorage
                localStorage.setItem(`claimed_${taskId}`, 'true');

                // Update the score display with commas for thousand separators
                scoreElement.textContent = `${parseInt(score).toLocaleString()} ALIENS`;

                // Disable the button and change text to "Claimed"
                button.textContent = "Claimed";
                button.disabled = true;

                alert(`Task ${taskId} claimed! You earned 100 ALIENS.`);
            }
        });
    });

    function getTelegramDetails() {
        let username = localStorage.getItem("username");
        let telegramAccountAge = localStorage.getItem("telegramAccountAge");
        let score = localStorage.getItem("score");

        // Prompt for username if not set
        if (!username) {
            username = prompt("Please enter your Telegram username:");
            localStorage.setItem("username", username);
        }

        // Calculate score based on Telegram account age if not already done
        if (!telegramAccountAge || !score) {
            telegramAccountAge = 365;  // Example, replace with actual days
            score = telegramAccountAge * 10;
            localStorage.setItem("telegramAccountAge", telegramAccountAge);
            localStorage.setItem("score", score);
        }

        // Format and display the username and score
        usernameElement.textContent = username;
        scoreElement.textContent = `${parseInt(score).toLocaleString()} ALIENS`;
    }
});
