// Function to start the countdown
function startCountdown(duration, display) {
  let timer = duration, hours, minutes, seconds;

  setInterval(function () {
    // Calculate hours, minutes, and seconds
    hours = Math.floor(timer / 3600);
    minutes = Math.floor((timer % 3600) / 60);
    seconds = timer % 60;

    // Display the result in the "01hr.38mins" format
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + "hr. " + minutes + "mins";

    // Decrement the timer every second
    if (--timer < 0) {
      // Reset the timer to 8 hours (28800 seconds)
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  // Duration is set to 8 hours in seconds (8 hours = 28800 seconds)
  const eightHours = 60 * 60 * 8;
  
  // Target the element where the countdown will be displayed
  const display = document.querySelector('.time-left');
  
  // Start the countdown
  startCountdown(eightHours, display);
};
