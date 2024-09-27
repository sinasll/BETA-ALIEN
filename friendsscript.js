document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");
    const scoreElement = document.getElementById("score");
    const friendsList = document.getElementById("friendsList");

    // Fetch username and score
    getTelegramDetails();

    // Function to invite friends via Telegram
    window.inviteFriends = function() {
        const message = `Join @minortappingbot! And get ALIENS to be rewarded with airdrop, I'm - ${localStorage.getItem("username")}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank'); // Open in a new tab
    };

    // Function to copy the invite link to clipboard
    window.copyInviteLink = function() {
        const botLink = "https://t.me/minortappingbot";
        navigator.clipboard.writeText(botLink)
            .then(() => {
                alert("Invite link copied");
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    };

    // Function to save invited friends automatically
    function saveInvitedFriend(friendUsername) {
        let invitedFriends = JSON.parse(localStorage.getItem("invitedFriends")) || [];
        if (!invitedFriends.includes(friendUsername)) { // Avoid duplicates
            invitedFriends.push(friendUsername);
            localStorage.setItem("invitedFriends", JSON.stringify(invitedFriends));

            // Reward the user with 50 points for each invite
            let score = parseInt(localStorage.getItem("score")) || 0;
            score += 50;  // 50 points for each invite
            localStorage.setItem("score", score);
            
            // Update the displayed score
            scoreElement.textContent = `${score.toLocaleString()} ALIENS`;

            // Update the friends list display
            displayInvitedFriends();
        }
    }

    // Automatically save the current user's username as an invited friend
    function addCurrentUserAsFriend() {
        const currentUsername = localStorage.getItem("username");
        if (currentUsername) {
            saveInvitedFriend(currentUsername);
        }
    }

    // Function to display the invited friends
    function displayInvitedFriends() {
        let invitedFriends = JSON.parse(localStorage.getItem("invitedFriends")) || [];
        friendsList.innerHTML = invitedFriends.map(friend => `<div>${friend}</div>`).join('');
    }

    // Call to add the current user as an invited friend on load
    addCurrentUserAsFriend();

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

        // Prompt for Telegram account age if not set
        if (!telegramAccountAge) {
            telegramAccountAge = prompt("Please enter the number of days your Telegram account has existed:");
            if (telegramAccountAge) {
                localStorage.setItem("telegramAccountAge", telegramAccountAge);
            } else {
                alert("Telegram account age is required!");
                return;
            }
        }

        // Calculate score if not already set
        if (!score) {
            score = telegramAccountAge * 10; // 10 points for each day
            localStorage.setItem("score", score);
        } else {
            // If score already exists, ensure it’s up-to-date
            score = parseInt(score, 10);
        }

        // Format the score with commas and display
        usernameElement.textContent = username;
        scoreElement.textContent = `${score.toLocaleString()} ALIENS`;

        // Display previously invited friends
        displayInvitedFriends();
    }
});
