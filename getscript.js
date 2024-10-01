document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;
    const accountCreationDate = localStorage.getItem('accountCreationDate');
    const hasClaimedReward = localStorage.getItem('hasClaimedReward') === 'true'; // Check if reward has been claimed

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Check if accountCreationDate is already set
    if (!accountCreationDate) {
        alert("Please provide your Telegram account creation date!");
    }

    // Disable the calculate button if reward has been claimed
    if (hasClaimedReward) {
        const calculateButton = document.getElementById('calculate-button');
        calculateButton.classList.add('disabled'); // Add the disabled class
        calculateButton.textContent = "Calculated"; // Change text here
    }

    // Add event listener for the calculate button
    document.getElementById('calculate-button').addEventListener('click', () => {
        const creationDate = new Date(localStorage.getItem('accountCreationDate'));
        const currentDate = new Date();
        const timeDifference = currentDate - creationDate; // in milliseconds
        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days

        // Calculate new score based on days since account creation
        const newScore = dayDifference * 10;

        // Update score in localStorage and on the page
        localStorage.setItem('score', newScore);
        document.getElementById('score').textContent = newScore;

        // Set the reward claimed flag, disable the button, and add the disabled class
        localStorage.setItem('hasClaimedReward', 'true');
        const calculateButton = document.getElementById('calculate-button');
        calculateButton.classList.add('disabled'); // Add the disabled class
        calculateButton.textContent = "Calculated"; // Change text here
    });
});
