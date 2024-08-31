// Sample Data (replace with your dynamic friend data and scores)
const friends = [
    { username: 'sinasll', score: 2368 },
    { username: 'sinasalah', score: 166 },
    { username: 'sin', score: 1865 },
    { username: 'sinasalahhaji', score: 377 },
    { username: 'sinaslh', score: 12297 }
];

// Initialize points for the player
let playerPoints = 0;
const pointPerInvite = 50;

// Update the friend list on the leaderboard
const friendList = document.getElementById('friend-list');

function updateLeaderboard() {
    friendList.innerHTML = ''; // Clear the current leaderboard
    friends.forEach((friend, index) => {
        const li = document.createElement('li');
        li.innerHTML = ${index + 1}. ${friend.username} ❄ ${friend.score.toLocaleString()};
        friendList.appendChild(li); // Add each friend to the list
    });
}

// Function to invite a new friend
function inviteFriend() {
    const newFriendUsername = prompt("Enter your friend's username:");
    
    if (newFriendUsername) {
        const newFriend = {
            username: newFriendUsername,
            score: Math.floor(Math.random() * 1000) // Generate a random score for the new friend
        };

        // Add new friend to the friends list
        friends.push(newFriend);

        // Add 50 points to the player's total points
        playerPoints += pointPerInvite;

        // Update the leaderboard
        updateLeaderboard();

        // Display the total points
        alert(`You earned ${pointPerInvite} points! Total points: ${playerPoints}`);
    }
}

// Initialize the leaderboard
updateLeaderboard();

// Handle invite button click
document.querySelector('.invite-btn').addEventListener('click', inviteFriend);