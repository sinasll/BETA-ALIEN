// Function to fetch and display the Telegram username
function getTelegramUsername() {
    // Assuming you have a way to get the username from your bot
    // You can use Telegram Web Apps or handle this on the server-side

    // Example: Fetching the username from your server
    fetch('https://your-server-url/get-username') // Adjust the URL to your server endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the response contains { username: 'user123' }
            const usernameElement = document.getElementById('username');
            usernameElement.textContent = `@${data.username}`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Call the function when the page loads
window.onload = getTelegramUsername;
