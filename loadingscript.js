// Optional: Add a timed delay to transition from the loading page
setTimeout(() => {
    // Redirect to your game's main page or home screen after loading
    window.location.href = "main.html"; // Replace with the actual main game URL
}, 5000); // Delay before redirect, adjust as needed
// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Request the app to expand to full size
Telegram.WebApp.expand();
// Ensure the app fits the full viewport height dynamically
document.documentElement.style.height = Telegram.WebApp.viewportHeight + 'px';
