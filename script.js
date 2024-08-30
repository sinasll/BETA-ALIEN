// Function to show the selected section and hide others
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(`${sectionId}-section`).style.display = 'block';
}

// Update score based on Telegram ID
async function updateScore(telegramId) {
    try {
        const response = await fetch(`/api/score/${telegramId}`);
        const data = await response.json();
        if (data.score !== undefined) {
            document.getElementById('score').textContent = data.score;
        } else {
            console.error('Error fetching score:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Handle invite link click
document.getElementById('invite-link').addEventListener('click', async (event) => {
    event.preventDefault();
    const telegramId = 'user_telegram_id'; // Replace with actual user Telegram ID

    // Handle invite logic
    try {
        await fetch('/api/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegramId, invitedUserId: 'new_user_telegram_id' }) // Replace with actual new user ID
        });
        // Optionally refresh the score
        updateScore(telegramId);
    } catch (error) {
        console.error('Error:', error);
    }
});

// Sample tasks (add these dynamically in practice)
const tasksContainer = document.getElementById('tasks-container');
for (let i = 1; i <= 10; i++) {
    tasksContainer.innerHTML += `
        <div class="task" id="task-${i}">
            <p>Task ${i} description goes here.</p>
            <button class="claim-button" onclick="claimTask('task-${i}')">Claim Prize</button>
            <button class="check-button" onclick="checkTask('task-${i}')">Check Task</button>
        </div>
    `;
}

// Show the home section by default
showSection('home');
