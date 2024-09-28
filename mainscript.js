// Function to fetch and display the Telegram user's first name
function getTelegramUsername() {
    // Fetching the first name from your server
    fetch('https://your-server-url/get-username') // Adjust the URL to your server endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the response contains { firstName: 'John' }
            const usernameElement = document.getElementById('username');
            usernameElement.textContent = `${data.firstName}`; // Display first name only
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Call the function when the page loads
window.onload = getTelegramUsername;
