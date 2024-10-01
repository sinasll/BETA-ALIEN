document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;
    let accountCreationDate = localStorage.getItem('accountCreationDate');
    const lastClaimTime = localStorage.getItem('lastClaimTime'); // Store the last claim time
    const oneDayInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Check if accountCreationDate is already set
    if (!accountCreationDate) {
        accountCreationDate = new Date(); // Set current date if not set
        localStorage.setItem('accountCreationDate', accountCreationDate.toISOString());
    }

    // Disable the calculate button if reward has been claimed
    const hasClaimedReward = localStorage.getItem('hasClaimedReward') === 'true'; // Check if reward has been claimed

    if (hasClaimedReward) {
        const calculateButton = document.getElementById('calculate-button');
        calculateButton.classList.add('disabled'); // Add the disabled class
        calculateButton.textContent = "Calculated"; // Change text here
    }

    // Update reward button state
    const rewardButton = document.getElementById('reward-button');
    const currentTime = new Date();

    // Check if the button should be disabled
    if (lastClaimTime && (currentTime - new Date(lastClaimTime)) < oneDayInMillis) {
        disableRewardButton(rewardButton, lastClaimTime);
    }

    // Function to claim daily reward
    rewardButton.addEventListener('click', () => {
        const rewardAmount = 100; // Amount of points to reward

        // Update score in localStorage and on the page
        const newScore = storedScore + rewardAmount;
        localStorage.setItem('score', newScore);
        document.getElementById('score').textContent = newScore;

        // Update the last claim time
        localStorage.setItem('lastClaimTime', currentTime.toISOString());

        // Disable the button and change its text
        rewardButton.classList.add('disabled'); // Add the disabled class
        rewardButton.textContent = "Rewarded"; // Change text here
    });

    // Add event listener for the calculate button
    document.getElementById('calculate-button').addEventListener('click', () => {
        const creationDate = new Date(localStorage.getItem('accountCreationDate'));
        const currentDate = new Date();
        const timeDifference = currentDate - creationDate; // in milliseconds
        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days

        // Debugging output
        console.log("Creation Date:", creationDate);
        console.log("Current Date:", currentDate);
        console.log("Time Difference:", timeDifference);
        console.log("Day Difference:", dayDifference);

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

    // Function to disable reward button and start countdown
    function disableRewardButton(button, lastClaimTime) {
        button.classList.add('disabled'); // Disable the button
        button.textContent = "Rewarded"; // Change text here
        button.style.backgroundColor = "white"; // Change button background to white
        button.style.color = "black"; // Change text color to black

        // Create countdown
        const countdownDisplay = document.getElementById('countdown');
        countdownDisplay.style.display = 'block'; // Make countdown visible

        const updateInterval = setInterval(() => {
            const currentTime = new Date();
            const remainingTime = Math.max(0, (new Date(lastClaimTime).getTime() + oneDayInMillis) - currentTime.getTime()) / 1000; // in seconds

            updateCountdown(remainingTime, countdownDisplay);

            if (remainingTime <= 0) {
                clearInterval(updateInterval);
                button.classList.remove('disabled'); // Re-enable the button
                button.textContent = "Claim Reward"; // Reset button text
                countdownDisplay.style.display = 'none'; // Hide countdown
            }
        }, 1000); // Update every second
    }

    // Function to update countdown display
    function updateCountdown(seconds, display) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        display.textContent = `${hours}h ${minutes}m`; // Show only hours and minutes
    }

    // Add event listener for the history button
    document.getElementById('history-button').addEventListener('click', () => {
        // Get the account creation date from localStorage
        const accountCreationDate = localStorage.getItem('accountCreationDate');

        // Calculate days since account creation
        if (accountCreationDate) {
            const creationDate = new Date(accountCreationDate);
            const currentDate = new Date();
            const timeDifference = currentDate - creationDate; // in milliseconds
            const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days
            
            // Show alert with the number of days
            alert(`Your Telegram account has been created for ${dayDifference} days.`);
        } else {
            alert("Account creation date not found.");
        }
    });
});
