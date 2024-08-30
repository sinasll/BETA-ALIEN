document.addEventListener('DOMContentLoaded', () => {
    const homeNav = document.getElementById('home-nav');
    const friendsNav = document.getElementById('friends-nav');
    const tasksNav = document.getElementById('tasks-nav');
    const adsNav = document.getElementById('ads-nav');
    const walletNav = document.getElementById('wallet-nav');

    const homeSection = document.getElementById('home-section');
    const friendsSection = document.getElementById('friends-section');
    const tasksSection = document.getElementById('tasks-section');
    const adsSection = document.getElementById('ads-section');

    // Initial load
    showSection(homeSection);

    homeNav.addEventListener('click', () => showSection(homeSection));
    friendsNav.addEventListener('click', () => showSection(friendsSection));
    tasksNav.addEventListener('click', () => showSection(tasksSection));
    adsNav.addEventListener('click', () => showSection(adsSection));
    walletNav.addEventListener('click', () => {
        // Implement wallet functionality here
        alert('Wallet feature coming soon!');
    });

    function showSection(section) {
        homeSection.style.display = 'none';
        friendsSection.style.display = 'none';
        tasksSection.style.display = 'none';
        adsSection.style.display = 'none';

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
        window.open('https://t.me/minortappingbot', '_blank');
    });

    // Mock-up for watching ads
    let points = parseInt(document.getElementById('score').innerText, 10);
    const watchAdBtn = document.getElementById('watch-ad-btn');
    const adStatus = document.getElementById('ad-status');

    watchAdBtn.addEventListener('click', () => {
        adStatus.innerText = 'You have watched an ad. 50 points have been added!';
        points += 50;
        document.getElementById('score').innerText = points;
    });
});
