document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");
    const scoreElement = document.getElementById("score");
    const claimButtons = document.querySelectorAll(".claim-button");

    // Map of tasks to their respective URLs
    const taskLinks = {
        task1: "https://t.me/your_telegram_channel", // Replace with your actual Telegram channel link
        task2: "https://twitter.com/your_x_account", // Replace with your actual X (Twitter) account link
        task3: "https://instagram.com/your_instagram_account", // Replace with your actual Instagram link
        task4: "https://youtube.com/c/your_youtube_channel", // Replace with your actual YouTube channel link
        task5: "https://youtube.com/watch?v=your_video_id", // Replace with your actual YouTube video link
        task6: "https://t.me/blum/app?startapp=ref_xISYvf9EZw", // Replace with the link for joining BLUM
        task7: "https://t.me/Dogiators_bot/game?startapp=kJV57iwkt573CXN8"
    };

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
            // Open the task link in a new tab
            window.open(taskLinks[taskId], '_blank');

            // Inform the user to complete the task
            alert("Please complete the task in the new tab. You will be able to claim your reward after you do.");

            // Mark the task as completed in localStorage
            localStorage.setItem(`completed_${taskId}`, 'true');

            // Disable the button and change text to "Claimed"
            button.textContent = "Claimed";
            button.disabled = true;
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
