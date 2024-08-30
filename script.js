document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const totalScoreElem = document.getElementById('total-score');
    const snowingScoreElem = document.getElementById('snowing-score');
    const gameResultElem = document.getElementById('game-result');
    const timeLeftElem = document.getElementById('time-left');

    let totalScore = 0;
    let snowingScore = 0;
    let countdownInterval;
    let farmingInterval;
    let countdownTime = 7 * 60 * 60; // 7 hours in seconds
    let canClaimPoints = false; // Flag to check if points can be claimed

    function updateTimerDisplay(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const sec = seconds % 60;
        timeLeftElem.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    function startCountdown() {
        countdownInterval = setInterval(() => {
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                clearInterval(farmingInterval); // Stop farming when countdown ends
                gameResultElem.innerText = 'Time is up! Tap the snowing score to claim your 100 points!';
                canClaimPoints = true; // Allow points to be claimed
                updateTimerDisplay(0);
                return;
            }
            countdownTime--;
            updateTimerDisplay(countdownTime);
        }, 1000);
    }

    function startFarming() {
        farmingInterval = setInterval(() => {
            if (countdownTime > 0) {
                snowingScore += 0.1; // Increment snowing score
                snowingScoreElem.innerText = snowingScore.toFixed(3);
            }
        }, 1000); // Update every second
    }

    function claimPoints() {
        if (canClaimPoints) {
            totalScore += 100; // Add fixed 100 points when the countdown finishes
            totalScoreElem.innerText = totalScore;
            snowingScore = 0; // Reset snowing score after claiming
            snowingScoreElem.innerText = snowingScore.toFixed(3);
            canClaimPoints = false; // Prevent re-claiming
            gameResultElem.innerText = 'You claimed your 100 points!';
        } else {
            gameResultElem.innerText = 'Points cannot be claimed yet!';
        }
    }

    playBtn.addEventListener('click', () => {
        // Simulate a game with a random score
        const gameScore = Math.floor(Math.random() * 100) + 1; // Random score between 1 and 100

        // Update the total score
        totalScore += gameScore;
        totalScoreElem.innerText = totalScore;

        // Display game result
        gameResultElem.innerText = `You earned ${gameScore} points!`;

        if (!countdownInterval) {
            // Only start countdown and farming if they are not already running
            startCountdown();
            startFarming();
        }
    });

    snowingScoreElem.addEventListener('click', claimPoints); // Add event listener to claim points by tapping the snowing score

    // Initialize timer display
    updateTimerDisplay(countdownTime);
});
