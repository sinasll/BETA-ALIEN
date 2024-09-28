// Function to set account creation date in local storage
function setAccountCreationDate(date) {
    localStorage.setItem('accountCreationDate', date.toISOString());
}

// Function to get account creation date from local storage
function getAccountCreationDate() {
    const date = localStorage.getItem('accountCreationDate');
    return date ? new Date(date) : null;
}

// Function to calculate score based on the user's Telegram account age
function calculateScore() {
    const accountCreationDate = getAccountCreationDate();
    if (!accountCreationDate) {
        alert("Account creation date not found.");
        return 0;
    }

    const currentDate = new Date();
    const timeDiff = currentDate - accountCreationDate; // Difference in milliseconds
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    // Calculate points: 10 points for each day
    const points = daysDiff >= 0 ? daysDiff * 10 : 0; // Ensure points are not negative
    return points;
}

// Function to automatically set the account creation date if not already set
function autoSetCreationDate() {
    if (!getAccountCreationDate()) {
        setAccountCreationDate(new Date()); // Set to current date
        console.log("Account creation date set to current date.");
    }
}

// Function to update the score in the UI
function updateScore(points) {
    const scoreElement = document.getElementById('score');
    let currentScore = parseInt(scoreElement.innerText) || 0; // Default to 0 if NaN
    currentScore += points;
    scoreElement.innerText = currentScore;

    // Save the updated score in local storage
    localStorage.setItem('score', currentScore);
}

// Function to handle daily reward
function claimDailyReward() {
    const lastClaimDate = localStorage.getItem('lastClaimDate');
    const currentDate = new Date();

    // Calculate the time difference since the last claim
    const timeDiff = lastClaimDate ? currentDate - new Date(lastClaimDate) : null;

    // Check if the user can claim the reward
    if (!lastClaimDate || timeDiff >= 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
        const rewardPoints = 100; // Reward for daily claim
        updateScore(rewardPoints);
        localStorage.setItem('lastClaimDate', new Date().toISOString()); // Update last claim date
        alert("You've claimed your daily reward of 100 points!");
    } else {
        alert("You've already claimed your daily reward today. Please try again tomorrow!");
    }

    // Update button availability
    updateRewardButtonAvailability();
}

// Function to update the daily reward button availability
function updateRewardButtonAvailability() {
    const lastClaimDate = localStorage.getItem('lastClaimDate');
    const currentDate = new Date();

    // Calculate the time difference since the last claim
    const timeDiff = lastClaimDate ? currentDate - new Date(lastClaimDate) : null;

    const rewardButton = document.getElementById('reward-button');

    // If the user can claim the reward again, enable the button
    if (!lastClaimDate || timeDiff >= 24 * 60 * 60 * 1000) {
        rewardButton.classList.remove("disabled"); // Remove disabled class
        rewardButton.innerText = "Claim Daily Reward"; // Reset button text
    } else {
        rewardButton.classList.add("disabled"); // Add disabled class
        rewardButton.innerText = "Rewarded"; // Update button text to "Rewarded"
    }
}

// Function to handle score calculation and disable button
function handleCalculateButton() {
    const totalPoints = calculateScore();
    updateScore(totalPoints);

    // Disable the button and change its text
    const calculateButton = document.getElementById('calculate-button');
    calculateButton.innerText = "Calculated"; // Change button text
    calculateButton.classList.add("disabled"); // Add disabled class
    calculateButton.removeEventListener('click', handleCalculateButton); // Remove event listener

    // Save the state of the button in local storage
    localStorage.setItem('calculateButtonState', 'disabled');
}

// Function to check button state on page load
function checkCalculateButtonState() {
    const buttonState = localStorage.getItem('calculateButtonState');
    const calculateButton = document.getElementById('calculate-button');

    if (buttonState === 'disabled') {
        calculateButton.innerText = "Calculated"; // Change button text
        calculateButton.classList.add("disabled"); // Add disabled class
    }
}

// Function to get the username from the URL
function getUsernameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('username');
}

// Function to set username in local storage
function setUsernameInLocalStorage(username) {
    localStorage.setItem('telegramUsername', username);
}

// Event listeners for buttons
document.getElementById('calculate-button').addEventListener('click', handleCalculateButton);
document.getElementById('reward-button').addEventListener('click', claimDailyReward);

// Load initial score and username from local storage
window.onload = () => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
        document.getElementById('score').innerText = savedScore;
    }

    // Check and update the reward button availability on page load
    updateRewardButtonAvailability();

    // Check the state of the calculate button
    checkCalculateButtonState();

    // Automatically set the account creation date if not set
    autoSetCreationDate();

    // Get username from the URL and store it in local storage
    const username = getUsernameFromUrl();
    if (username) {
        setUsernameInLocalStorage(username);
        console.log("Username set to local storage:", username);
    }
};
