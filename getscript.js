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
        rewardButton.classList.add('disabled'); // Disable the button
        rewardButton.textContent = "Rewarded"; // Change text here
        rewardButton.style.backgroundColor = "white"; // Change button background to white
        rewardButton.style.color = "black"; // Change text color to black

        // Calculate remaining time until the button is re-enabled
        const remainingTime = Math.ceil((oneDayInMillis - (currentTime - new Date(lastClaimTime))) / (1000 * 60 * 60)); // in hours

        // Uncomment below line if you still want to log the remaining time
        // console.log("You can claim your daily reward again in " + remainingTime + " hours.");
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
        rewardButton.style.backgroundColor = "white"; // Change button background to white
        rewardButton.style.color = "black"; // Change text color to black
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
});
