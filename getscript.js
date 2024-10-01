document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    const lastClaimTime = localStorage.getItem('lastClaimTime'); // Store the last claim time
    const oneDayInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const apiToken = 'YOUR_API_TOKEN_HERE'; // Replace with your actual API token

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Check if the user has an account creation date
    if (!localStorage.getItem('accountCreationDate') && userId) {
        // Fetch user information from the Telegram Bot API
        fetch(`https://api.telegram.org/bot${apiToken}/getChat?chat_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    const joinDate = new Date(data.result.date * 1000); // Convert seconds to milliseconds
                    localStorage.setItem('accountCreationDate', joinDate.toISOString());
                    console.log("Account Creation Date:", joinDate);
                } else {
                    console.error('Failed to fetch user data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
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
        const accountCreationDate = localStorage.getItem('accountCreationDate');
        if (accountCreationDate) {
            const creationDate = new Date(accountCreationDate);
            const dayDifference = calculateDaysSinceCreation(creationDate);

            // Calculate new score based on days since account creation
            const newScore = storedScore + dayDifference * 10; // 10 points for each day
            localStorage.setItem('score', newScore);
            document.getElementById('score').textContent = newScore;

            // Update the last claim time
            localStorage.setItem('lastClaimTime', currentTime.toISOString());

            // Disable the button and change its text
            rewardButton.classList.add('disabled'); // Add the disabled class
            rewardButton.textContent = "Rewarded"; // Change text here
        } else {
            alert("Account creation date not found.");
        }
    });

    // Add event listener for the calculate button
    document.getElementById('calculate-button').addEventListener('click', () => {
        const accountCreationDate = localStorage.getItem('accountCreationDate');
        if (accountCreationDate) {
            const creationDate = new Date(accountCreationDate);
            const dayDifference = calculateDaysSinceCreation(creationDate);

            // Calculate new score based on days since account creation
            const newScore = dayDifference * 10; // 10 points for each day

            // Update score in localStorage and on the page
            localStorage.setItem('score', newScore);
            document.getElementById('score').textContent = newScore;

            // Set the reward claimed flag, disable the button, and add the disabled class
            localStorage.setItem('hasClaimedReward', 'true');
            const calculateButton = document.getElementById('calculate-button');
            calculateButton.classList.add('disabled'); // Add the disabled class
            calculateButton.textContent = "Calculated"; // Change text here
        } else {
            alert("Account creation date not found.");
        }
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

    // Function to calculate days since account creation
    function calculateDaysSinceCreation(creationDate) {
        const currentDate = new Date();
        const timeDifference = currentDate - creationDate; // in milliseconds
        return Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days
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
            const dayDifference = calculateDaysSinceCreation(creationDate);
            
            // Show alert with the number of days
            alert(`Your Telegram account has been created for ${dayDifference} days.`);
        } else {
            alert("Account creation date not found.");
        }
    });
});
