document.addEventListener('DOMContentLoaded', () => {
    // Fetch username from localStorage (set on the main page)
    const username = localStorage.getItem('username') || '@username';
    document.getElementById('username').textContent = username;

    // Initialize score from localStorage or set to 0 if not found
    let score = parseInt(localStorage.getItem('score')) || 0;
    document.getElementById('score').textContent = score;

    // Function to update the score
    function updateScore(points) {
        score += points;
        localStorage.setItem('score', score);  // Save updated score to localStorage
        document.getElementById('score').textContent = score;
    }

    // Function to update the countdown on the button
    function updateCountdown() {
        const rewardButton = document.getElementById('reward-button');
        const lastClaim = parseInt(localStorage.getItem('lastClaim')) || 0;
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const timeLeft = oneDay - (now - lastClaim);

        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (60 * 60 * 1000));
            const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
            rewardButton.textContent = `${hours}h ${minutes}m`; // Show only the countdown
            rewardButton.disabled = true; // Disable the button
            rewardButton.classList.add('disabled'); // Add disabled class for styling
        } else {
            rewardButton.textContent = 'Claim 100 ALIENS'; // Reset button text
            rewardButton.disabled = false; // Enable the button
            rewardButton.classList.remove('disabled'); // Remove disabled class
        }
    }

    // Set up the daily reward button
    const rewardButton = document.getElementById('reward-button');
    rewardButton.addEventListener('click', () => {
        const lastClaim = parseInt(localStorage.getItem('lastClaim')) || 0;
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;  // 24 hours in milliseconds

        // Check if 24 hours have passed since the last reward claim
        if (now - lastClaim >= oneDay) {
            updateScore(100);  // Add 100 ALIENS to the player's score
            localStorage.setItem('lastClaim', now);  // Save the time of last reward claim
            alert('You have claimed 100 ALIENS!');
            updateCountdown();  // Start the countdown after claiming
        }
    });

    // Initialize the countdown if applicable
    updateCountdown();

    // Update countdown every minute
    setInterval(updateCountdown, 60 * 1000);  // Update countdown every 60 seconds
});
