// getscript.js
document.addEventListener('DOMContentLoaded', () => {
    const telegram = window.Telegram.WebApp;

    // Fetch username from Telegram Web App
    const username = telegram.initDataUnsafe.user?.username || '@username';
    
    const storedUsername = localStorage.getItem('username') || username;
    const storedScore = parseInt(localStorage.getItem('score')) || 0;

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Store username in localStorage
    localStorage.setItem('username', storedUsername);

    // Add event listener for the calculate button
    document.getElementById('calculate-button').addEventListener('click', () => {
        // Debugging: log user data
        console.log(telegram.initDataUnsafe.user);

        // Get account creation date from Telegram Web App
        // Note: Adjust this line if the dateCreated property is not available
        const accountCreationDate = new Date(telegram.initDataUnsafe.user?.dateCreated * 1000) || new Date(); // Fallback to current date

        // Debugging: log account creation date
        console.log("Account Creation Date:", accountCreationDate);

        const currentDate = new Date();
        const timeDifference = currentDate - accountCreationDate; // in milliseconds
        
        if (timeDifference < 0) {
            console.error("Account creation date is in the future.");
            return; // Prevent further execution if the date is invalid
        }

        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days

        // Calculate new score based on days since account creation
        const newScore = dayDifference * 10;

        // Update score in localStorage and on the page
        localStorage.setItem('score', newScore);
        document.getElementById('score').textContent = newScore;

        // Change button text and disable it
        const calculateButton = document.getElementById('calculate-button');
        calculateButton.textContent = 'Calculated';
        calculateButton.disabled = true; // Disable the button
    });
});
