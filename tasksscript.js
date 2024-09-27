// Function to format the score with commas
function formatScore(score) {
    return score.toLocaleString(); // Adds commas based on the locale
}

// Function to retrieve the saved username from local storage
function loadUserData() {
    const savedUsername = localStorage.getItem('telegramUsername');
    const savedScore = localStorage.getItem('userScore');

    // Display saved username or a default message
    document.getElementById('username').innerText = savedUsername ? "@" + savedUsername : "@unknown";

    // Display saved score or default score
    document.getElementById('score').textContent = formatScore(savedScore ? parseInt(savedScore) : 0);
}

// Function to calculate the user's score based on account age
function calculateScore(creationDate) {
    const currentDate = new Date();
    const accountAgeInMilliseconds = currentDate - new Date(creationDate);
    const accountAgeInDays = Math.floor(accountAgeInMilliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    const scorePerDay = 10; // Score per day

    return accountAgeInDays * scorePerDay; // Total score
}

// Function to retrieve the Telegram account creation date via API
async function getAccountCreationDate() {
    try {
        const response = await fetch('/api/getTelegramAccountCreationDate'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return new Date(data.creationDate); // Assuming the API returns a JSON object with the creationDate
    } catch (error) {
        console.error('Error fetching account creation date:', error);
        return null; // Return null if the fetch fails
    }
}

// Function to update the score and save it in local storage
async function updateScoreDisplay() {
    const creationDate = await getAccountCreationDate(); // Retrieve the creation date
    if (creationDate) {
        const score = calculateScore(creationDate); // Calculate score
        document.getElementById('score').textContent = formatScore(score); // Display formatted score

        // Save the score to local storage
        localStorage.setItem('userScore', score);
    } else {
        document.getElementById('score').textContent = formatScore(0); // Display 0 if no valid date
    }
}

// Function to update the score when a new invite is claimed
function updateScore(newScore) {
    const currentScore = parseInt(localStorage.getItem('userScore')) || 0; // Get current score or 0
    const totalScore = currentScore + newScore; // Calculate total score
    localStorage.setItem('userScore', totalScore); // Save total score to local storage
    document.getElementById('score').textContent = formatScore(totalScore); // Update score display
}

// Function to handle claiming a task reward
function claimReward(button) {
    const taskDescription = button.previousElementSibling.textContent; // Get the task description
    let reward = 0;

    // Determine reward based on task description
    const rewardTasks = [
        'join our Telegram channel',
        'follow our X',
        'follow our Instagram',
        'subscribe to our YouTube',
        'watch our video',
        'join BLUM',
        'join CATS'
    ];
    
    if (rewardTasks.some(task => taskDescription.includes(task))) {
        reward = 100; // Assign reward for eligible tasks
    }

    if (reward > 0) {
        updateScore(reward); // Update the score if reward is valid
        const taskId = button.dataset.taskId; // Get the task ID from data attribute
        localStorage.setItem(taskId, true); // Save that the task has been claimed
        button.disabled = true; // Disable the claim button after use
        button.classList.add('claimed'); // Add the claimed class for styling
        button.textContent = "Claimed"; // Change button text
    }
}

// Function to check and disable claimed buttons on load
function checkClaimedTasks() {
    const claimButtons = document.querySelectorAll('.claim-button');
    claimButtons.forEach(button => {
        const taskId = button.dataset.taskId; // Get the task ID from data attribute
        if (localStorage.getItem(taskId)) {
            button.disabled = true; // Disable the button if the task was already claimed
            button.classList.add('claimed'); // Add the claimed class for styling
            button.textContent = "Claimed"; // Change button text
        }
    });
}

// Add event listeners to claim buttons
window.onload = async function() {
    loadUserData(); // Load saved username and score
    await updateScoreDisplay(); // Update the score display based on account age
    checkClaimedTasks(); // Check claimed tasks and disable buttons

    const claimButtons = document.querySelectorAll('.claim-button');
    claimButtons.forEach(button => {
        button.addEventListener('click', () => claimReward(button)); // Add click event to each button
    });
};
