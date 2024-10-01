// getscript.js
document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username') || '@username';
    const storedScore = parseInt(localStorage.getItem('score')) || 0;
    const userId = localStorage.getItem('userId'); // Assuming you store user ID in localStorage
    const apiToken = '7939954803:AAG2d3N4hvKlIW3O2tgF95W0TSVOGKY0Cws'; // Your Telegram bot token

    document.getElementById('username').textContent = storedUsername;
    document.getElementById('score').textContent = storedScore;

    // Fetch user information from the Telegram Bot API
    fetch(`https://api.telegram.org/bot${apiToken}/getChat?chat_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                const joinDate = new Date(data.result.date * 1000); // Convert seconds to milliseconds
                const currentDate = new Date();
                const timeDifference = currentDate - joinDate; // in milliseconds
                const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // convert to days
                
                // Display the account age in days
                document.getElementById('age').textContent = dayDifference; // Ensure you have an element with ID 'age' in your HTML

                // Add event listener for the calculate button
                document.getElementById('calculate-button').addEventListener('click', () => {
                    // Calculate new score based on days since account creation
                    const pointsAwarded = dayDifference * 100; // 100 points for each day
                    const newScore = storedScore + pointsAwarded;

                    // Update score in localStorage and on the page
                    localStorage.setItem('score', newScore);
                    document.getElementById('score').textContent = newScore;

                    alert(`You have earned ${pointsAwarded} points for having your account for ${dayDifference} days!`);
                });
            } else {
                console.error('Failed to fetch user data:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});
