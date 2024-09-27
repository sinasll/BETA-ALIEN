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

    // Function to calculate days between two dates
    function calculateDaysBetween(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000; // Hours * minutes * seconds * milliseconds
        return Math.floor((endDate - startDate) / oneDay);
    }

    // Function to set up the user data and calculate score based on Telegram account age
    function setupUserData(username, accountAgeInDays) {
        userData = {
            username: username.trim(),
            score: accountAgeInDays * 10 // 10 points for each day the account has existed
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
        // Use Telegram's Mini App API to get the user's Telegram username and user ID
        if (window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
            const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
            const telegramUsername = telegramUser.username;

            // Assume we have the account creation date (for example, from an external API or predefined method)
            // For demo purposes, let's assume the account was created on a specific date
            const accountCreationDate = new Date("2020-01-01"); // This should ideally come from the API
            const currentDate = new Date();

            // Calculate account age in days
            const accountAgeInDays = calculateDaysBetween(accountCreationDate, currentDate);

            // If Telegram username exists and is not taken, use it
            if (telegramUsername && !isUsernameTaken(telegramUsername)) {
                setupUserData(telegramUsername, accountAgeInDays);
            } else {
                // If Telegram username is missing or taken, prompt user to enter one
                let username = prompt("Please enter a unique username:");
                setupUserData(username, accountAgeInDays);
            }
        } else {
            // Fallback: if Telegram username isn't available, prompt for one
            let username = prompt("Please enter a unique username:");
            const accountCreationDate = new Date("2020-01-01"); // Placeholder
            const currentDate = new Date();
            const accountAgeInDays = calculateDaysBetween(accountCreationDate, currentDate);
            setupUserData(username, accountAgeInDays);
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
