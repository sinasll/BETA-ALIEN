document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");
    const scoreElement = document.getElementById("score");
    const friendsList = document.getElementById("friendsList");

    // Fetch username and score
    getTelegramDetails();

    // Function to invite friends via Telegram
    window.inviteFriends = function() {
        const friendUsername = prompt("Enter your friend's Telegram username:");
        if (!friendUsername) {
            alert("Friend's username is required!");
            return; // Exit if no username is provided
        }
        
        const message = `Join @minortappingbot! And get ALIENS to be rewarded with airdrop, I'm - ${localStorage.getItem("username")}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(message)}&text=Inviting ${friendUsername}`;
        window.open(telegramUrl, '_blank'); // Open in a new tab

        // Save the invited friend's username
        saveInvitedFriend(friendUsername);
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

    // Function to display the invited friends
    function displayInvitedFriends() {
        let invitedFriends = JSON.parse(localStorage.getItem("invitedFriends")) || [];
        friendsList.innerHTML = invitedFriends.map(friend => `<div>${friend}</div>`).join('');
    }

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

        // Format and display the score with commas
        usernameElement.textContent = username;
        scoreElement.textContent = `${score.toLocaleString()} ALIENS`;

        // Display previously invited friends
        displayInvitedFriends();
    }
});
