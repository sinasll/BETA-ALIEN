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
