// getscript.js
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;
    const accountCreationDate = localStorage.getItem('accountCreationDate');

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Check if accountCreationDate is already set
    if (!accountCreationDate) {
        // If not set, store the current date as the creation date
        localStorage.setItem('accountCreationDate', new Date().toISOString());
    }

    // Add event listener for the calculate button
    document.getElementById('calculate-button').addEventListener('click', () => {
        const creationDate = new Date(localStorage.getItem('accountCreationDate'));
        const currentDate = new Date();
        const timeDifference = currentDate - creationDate; // in milliseconds
        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days

        // Calculate new score based on days since account creation
        const newScore = dayDifference * 10;

        // Update score in localStorage and on the page
        localStorage.setItem('score', newScore);
        document.getElementById('score').textContent = newScore;
    });
});
