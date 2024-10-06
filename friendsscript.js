// Update username and score from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Set up the invite friends button
    document.getElementById('invite-button').addEventListener('click', inviteFriends);
    document.getElementById('copy-link-button').addEventListener('click', copyInviteLink);

    // Load invited friends from localStorage
    loadInvitedFriends();
});

// Function to invite friends via a Telegram message
function inviteFriends() {
    const botUsername = 'betaaliens_bot'; // Your bot username
    const message = `Join ALIENS 👾 for the most fun game on Telegram! Take the opportunity, your UFO ticket is there 🛸
    
    : https://t.me/${botUsername}`;
    
    // Open Telegram share dialog with the message
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
}

// Function to add invited friends and update their status
async function addInvitedFriend(username) {
    const storedFriends = JSON.parse(localStorage.getItem('invitedFriends')) || [];

    // Check if the friend is already invited
    if (!storedFriends.find(friend => friend.username === username)) {
        storedFriends.push({ username: username, pending: true, score: 0 }); // Add the invited friend
        localStorage.setItem('invitedFriends', JSON.stringify(storedFriends));

        // Send invitation to the server
        const response = await fetch('http://localhost:3000/invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inviter: document.getElementById('username').textContent.trim(), invitedFriend: username })
        });

        if (response.ok) {
            alert(`You invited @${username}. Wait for them to launch the bot!`);
            loadInvitedFriends(); // Refresh the displayed list
        } else {
            alert('There was an error sending the invite. Please try again later.');
        }
    } else {
        alert('This friend has already been invited.');
    }
}

// Function to register when an invited friend launches the bot
async function registerLaunch(username) {
    const response = await fetch('http://localhost:3000/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitedFriend: username })
    });

    if (response.ok) {
        alert(`@${username} has launched the bot!`);
        updateFriendStatus(username); // Update the friend's status
    } else {
        alert('Error registering the launch. Please try again.');
    }
}

// Function to update the status of the invited friend after they launch the bot
function updateFriendStatus(username) {
    const storedFriends = JSON.parse(localStorage.getItem('invitedFriends')) || [];
    const friendIndex = storedFriends.findIndex(friend => friend.username === username);
    
    if (friendIndex !== -1) {
        storedFriends[friendIndex].pending = false; // Mark as not pending
        storedFriends[friendIndex].score = 100; // Assign score for launching the bot
        localStorage.setItem('invitedFriends', JSON.stringify(storedFriends));
        
        // Reward the inviter with 100 ALIENS
        rewardInviter();

        loadInvitedFriends(); // Refresh the displayed list
    }
}

// Function to reward the inviter for a successful referral
function rewardInviter() {
    let currentScore = parseInt(localStorage.getItem('score')) || 0; // Get current score
    currentScore += 100; // Increase by 100 ALIENS
    localStorage.setItem('score', currentScore); // Save updated score to localStorage

    // Update score display on the page
    document.getElementById('score').textContent = currentScore;
}

// Function to load invited friends and display them
function loadInvitedFriends() {
    const friendsList = document.getElementById('friendsList');
    const storedFriends = JSON.parse(localStorage.getItem('invitedFriends')) || [];

    friendsList.innerHTML = ''; // Clear the list

    for (const friend of storedFriends) {
        const friendItem = document.createElement('div');
        const score = friend.pending ? 'Pending...' : `${friend.score} ALIENS`; // Display friend username and status
        friendItem.textContent = `${friend.username} - ${score}`;
        friendsList.appendChild(friendItem);
    }
}

// Function to copy the invite link to the clipboard with the message
function copyInviteLink() {
    const botUsername = 'betaaliens_bot'; // Your bot username
    const message = `Join ALIENS 👾 for the most fun game on Telegram! Take the opportunity, your UFO ticket is there 🛸
    
    : https://t.me/${botUsername}`;
    
    navigator.clipboard.writeText(message)
        .then(() => {
            alert('Invite message copied to clipboard! Share it with your friends!');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}
