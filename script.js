// JavaScript for handling navigation and tasks
document.addEventListener('DOMContentLoaded', () => {
    const homeNav = document.getElementById('home-nav');
    const friendsNav = document.getElementById('friends-nav');
    const tasksNav = document.getElementById('tasks-nav');
    const walletNav = document.getElementById('wallet-nav');

    const homeSection = document.getElementById('home-section');
    const friendsSection = document.getElementById('friends-section');
    const tasksSection = document.getElementById('tasks-section');

    // Initial load
    showSection(homeSection);

    homeNav.addEventListener('click', () => showSection(homeSection));
    friendsNav.addEventListener('click', () => showSection(friendsSection));
    tasksNav.addEventListener('click', () => showSection(tasksSection));
    walletNav.addEventListener('click', () => {
        // Implement wallet functionality here
        alert('Wallet feature coming soon!');
    });

    function showSection(section) {
        homeSection.style.display = 'none';
        friendsSection.style.display = 'none';
        tasksSection.style.display = 'none';

        section.style.display = 'block';
    }

    // Example tasks
    const tasksContainer = document.getElementById('tasks-container');
    for (let i = 1; i <= 10; i++) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <p>Task ${i}: Description of task ${i}</p>
            <button class="claim-button">Claim 10 Points</button>
            <button class="check-button">Check Task</button>
        `;
        tasksContainer.appendChild(taskDiv);
    }

    // Handle invite button click
    const inviteBtn = document.getElementById('invite-btn');
    inviteBtn.addEventListener('click', () => {
        window.open('https://t.me/botsupport', '_blank');
    });
});
