document.addEventListener("DOMContentLoaded", () => {
    const usernameDisplay = document.getElementById("username");
    const scoreDisplay = document.getElementById("score");

    // Retrieve list of all existing usernames from localStorage
    let allUsernames = JSON.parse(localStorage.getItem("alienGameUsernames")) || [];

    // Check if current user data exists in localStorage
    let userData = JSON.parse(localStorage.getItem("alienGameUserData"));

    // Function to check if a username is already taken
    function isUsernameTaken(username) {
        return allUsernames.includes(username.toLowerCase());
    }

    // Function to handle user data setup
    function setupUserData(username) {
        // Ensure username is not empty or taken
        while (!username || username.trim() === "" || isUsernameTaken(username)) {
            username = prompt("Please enter a unique username:");

            if (!username || username.trim() === "") {
                alert("Username cannot be empty.");
            } else if (isUsernameTaken(username)) {
                alert("This username is already taken. Please choose a different one.");
            }
        }

        // Create user data object
        userData = {
            username: username.trim(),
            score: 0 // Initial score
        };

        // Save the new username in the list of all usernames
        allUsernames.push(userData.username.toLowerCase());
        localStorage.setItem("alienGameUsernames", JSON.stringify(allUsernames));

        // Save user data to localStorage
        localStorage.setItem("alienGameUserData", JSON.stringify(userData));

        // Display the username and score
        displayUserData();
    }

    // Function to display user data on the screen
    function displayUserData() {
        usernameDisplay.textContent = `Username: ${userData.username}`;
        scoreDisplay.textContent = `Score: ${userData.score}`;
    }

    // Check if we already have user data stored
    if (!userData) {
        // Use Telegram's Mini App API to get the user's Telegram username
        if (window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
            const telegramUsername = window.Telegram.WebApp.initDataUnsafe.user.username;

            if (telegramUsername && !isUsernameTaken(telegramUsername)) {
                // If Telegram username exists and is not taken, use it
                setupUserData(telegramUsername);
            } else {
                // If Telegram username is missing or taken, prompt user to enter one
                setupUserData(null);
            }
        } else {
            // Fallback: if Telegram username isn't available, prompt for one
            setupUserData(null);
        }
    } else {
        // If user data exists, display it
        displayUserData();
    }

    // Example of how you could update the score in the future
    function updateScore(newScore) {
        userData.score = newScore;
        localStorage.setItem("alienGameUserData", JSON.stringify(userData));
        scoreDisplay.textContent = `Score: ${userData.score}`;
    }
});
