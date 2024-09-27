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

    if (!userData) {
        let username = null;
        while (!username || username.trim() === "" || isUsernameTaken(username)) {
            username = prompt("Please enter a unique username:");

            if (!username || username.trim() === "") {
                alert("Username cannot be empty.");
            } else if (isUsernameTaken(username)) {
                alert("This username is already taken. Please choose a different one.");
            }
        }

        userData = {
            username: username.trim(),
            score: 0 // Initial score
        };

        // Save the new username in the list of all usernames
        allUsernames.push(userData.username.toLowerCase());
        localStorage.setItem("alienGameUsernames", JSON.stringify(allUsernames));

        // Save user data to localStorage
        localStorage.setItem("alienGameUserData", JSON.stringify(userData));
    }

    // Display the username and score
    usernameDisplay.textContent = `Username: ${userData.username}`;
    scoreDisplay.textContent = `Score: ${userData.score}`;

    // Example of how you could update the score in the future
    function updateScore(newScore) {
        userData.score = newScore;
        localStorage.setItem("alienGameUserData", JSON.stringify(userData));
        scoreDisplay.textContent = `Score: ${userData.score}`;
    }
});
