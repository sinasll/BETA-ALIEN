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

// Function to update the score and save it in local storage
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
window.onload = function() {
    loadUserData(); // Load saved username and score
    checkClaimedTasks(); // Check claimed tasks and disable buttons

    const claimButtons = document.querySelectorAll('.claim-button');
    claimButtons.forEach(button => {
        button.addEventListener('click', () => claimReward(button)); // Add click event to each button
    });
};
