// tasksscript.js

// Update username and score from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    const claimButtons = document.querySelectorAll('.claim-button');

    claimButtons.forEach(button => {
        const taskId = button.getAttribute('data-task-id');

        // Check if the task has been claimed before
        if (localStorage.getItem(`${taskId}_claimed`) === 'true') {
            button.textContent = 'Claimed';
            button.style.backgroundColor = 'white';
            button.style.color = 'black';
            button.disabled = true;
        }

        button.addEventListener('click', () => {
            // Task URLs
            const taskLinks = {
                task1: 'https://t.me/your_channel', // Replace with actual link
                task2: 'https://x.com/your_profile', // Replace with actual link
                task3: 'https://instagram.com/your_profile', // Replace with actual link
                task4: 'https://youtube.com/your_channel', // Replace with actual link
                task5: 'https://youtube.com/your_video', // Replace with actual link
                task6: 'invite_friends', // Logic for invited friends will be added
                task7: 'invite_friends', // Logic for invited friends will be added
            };

            if (taskId === 'task6' || taskId === 'task7') {
                const invitedFriends = parseInt(localStorage.getItem('invitedFriends')) || 0;

                if (taskId === 'task6' && invitedFriends >= 5) {
                    updateScore(500);
                    localStorage.setItem(`${taskId}_claimed`, 'true'); // Mark task as claimed
                } else if (taskId === 'task7' && invitedFriends >= 10) {
                    updateScore(1000);
                    localStorage.setItem(`${taskId}_claimed`, 'true'); // Mark task as claimed
                } else {
                    alert('You need to invite more friends to claim this task.');
                    return;
                }
            } else {
                // Redirect to task link
                window.open(taskLinks[taskId], '_blank');
                updateScore(100);
                localStorage.setItem(`${taskId}_claimed`, 'true'); // Mark task as claimed
            }

            // Disable button and change text
            button.textContent = 'Claimed';
            button.style.backgroundColor = 'white';
            button.style.color = 'black';
            button.disabled = true;
        });
    });
});

// Function to update the score
function updateScore(points) {
    const scoreElement = document.getElementById('score');
    const currentScore = parseInt(scoreElement.textContent);
    const newScore = currentScore + points;

    scoreElement.textContent = newScore;
    localStorage.setItem('score', newScore);
}
