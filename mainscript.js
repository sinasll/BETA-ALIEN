// script.js
async function fetchUserName() {
    try {
        // Replace with your endpoint that interacts with Telegram API
        const response = await fetch('YOUR_BACKEND_ENDPOINT'); 
        const data = await response.json();
        
        // Assuming the response has a field 'first_name'
        const firstName = data.first_name || '@username'; // Fallback if name not found
        document.getElementById('username').textContent = firstName;
    } catch (error) {
        console.error('Error fetching user data:', error);
        document.getElementById('username').textContent = '@username'; // Default username
    }
}

// Call the function to fetch the username
fetchUserName();
