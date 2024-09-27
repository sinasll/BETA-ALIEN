// Function to format the score with commas
function formatScore(score) {
    return score.toLocaleString(); // Adds commas based on the locale
}

// Function to retrieve the saved username and score from local storage
function loadUserData() {
    const savedUsername = localStorage.getItem('telegramUsername');
    const savedScore = localStorage.getItem('userScore');

    if (savedUsername) {
        document.getElementById('username').innerText = "@" + savedUsername; // Display saved username
    } else {
        document.getElementById('username').innerText = "@unknown"; // Default username if none saved
    }

    if (savedScore) {
        document.getElementById('score').textContent = formatScore(savedScore); // Display saved score
    } else {
        document.getElementById('score').textContent = formatScore(0); // Default score if none saved
    }
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

// Function to invite friends via Telegram
function inviteFriends() {
    const inviteLink = "https://t.me/minortappingbot"; // Link to your bot
    const message = `Hey! Join me on this awesome mini app: ${inviteLink}`;
    
    // This will trigger the Telegram app to send the message
    window.open(`tg://msg?text=${encodeURIComponent(message)}`);
    
    // Save the friend's username to the list (for demonstration, assuming the friend is known)
    const friendUsername = prompt("Enter your friend's Telegram username:");
    if (friendUsername) {
        saveInvitedFriend(friendUsername);
    }
}

// Function to save invited friends and update the display
function saveInvitedFriend(username) {
    const friendsList = document.getElementById('friendsList');
    
    // Create a new div for the invited friend
    const friendDiv = document.createElement('div');
    friendDiv.innerText = username; // Display the friend's username
    friendsList.appendChild(friendDiv); // Add to the list

    // Reward the user (but don't count the score yet)
    localStorage.setItem(`invited_${username}`, 'pending'); // Mark as pending until they launch the bot
}

// Function to copy the invite link to the clipboard
function copyInviteLink() {
    const inviteLink = "https://t.me/minortappingbot"; // Change to your bot's Telegram link
    navigator.clipboard.writeText(inviteLink).then(() => {
        alert("Invite link copied to clipboard!");
    }).catch(err => {
        console.error('Error copying link: ', err);
    });
}

// Check for pending friends and update score if they launch the bot
async function checkPendingInvites() {
    const friendsList = document.getElementById('friendsList').children;
    for (let friend of friendsList) {
        const username = friend.innerText;
        if (localStorage.getItem(`invited_${username}`) === 'pending') {
            // Here, you would have a mechanism to check if the friend launched the bot
            // For illustration, let's assume they did
            localStorage.setItem(`invited_${username}`, 'claimed'); // Mark as claimed
            updateScore(150); // Reward with points
        }
    }
}

// Add event listeners and load user data
window.onload = async function() {
    loadUserData(); // Load saved username and score
    await updateScoreDisplay(); // Update the score display
    checkPendingInvites(); // Check if any invites are pending
};
