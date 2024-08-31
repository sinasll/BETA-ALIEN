document.addEventListener('DOMContentLoaded', () => {
    const gameBox = document.getElementById('gameBox');
    const scoreDisplay = document.getElementById('score');
    const countdownDisplay = document.getElementById('countdown');
    const resultElem = document.getElementById('result');
    const resultMessageElem = document.getElementById('result-message');
    const continueBtn = document.getElementById('continue-btn');
    const leaveBtn = document.getElementById('leave-btn');

    let score = 0;
    let countdownTime = 30; // Countdown in seconds
    let countdownInterval;
    let spawnInterval;
    let snowflakes = []; // Array to track snowflakes
    let tickets = parseInt(localStorage.getItem('tickets') || '0', 10);
    let gameActive = true; // Flag to track if the game is active

    function getRandomSize() {
        const sizes = ['big', 'normal'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    function isPositionValid(x, y, size) {
        const sizeMapping = { big: 50, normal: 30 };
        const snowflakeSize = sizeMapping[size];

        for (let snowflake of snowflakes) {
            const rect1 = snowflake.getBoundingClientRect();
            const rect2 = {
                left: x,
                top: y,
                right: x + snowflakeSize,
                bottom: y + snowflakeSize
            };

            if (!(rect2.right < rect1.left || 
                  rect2.left > rect1.right || 
                  rect2.bottom < rect1.top || 
                  rect2.top > rect1.bottom)) {
                return false; // Overlapping
            }
        }
        return true; // No overlap
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake', 'shine'); // Add shine class for animation
        
        const size = getRandomSize();
        snowflake.classList.add(size);
        snowflake.innerHTML = '&#10052;'; // Unicode for snowflake symbol

        const sizeMapping = { big: 50, normal: 30 };
        const snowflakeSize = sizeMapping[size];
        
        let positionValid = false;
        let x, y;
        const maxAttempts = 20; // Increased max attempts for better spacing

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            x = Math.random() * (gameBox.offsetWidth - snowflakeSize);
            y = -snowflakeSize; // Start above the visible area

            if (isPositionValid(x, y, size)) {
                positionValid = true;
                break;
            }
        }

        if (!positionValid) {
            x = Math.random() * (gameBox.offsetWidth - snowflakeSize);
            y = -snowflakeSize;
        }

        snowflake.style.left = x + 'px';
        snowflake.style.top = y + 'px';
        gameBox.appendChild(snowflake);
        snowflakes.push(snowflake);

        function fall() {
            let currentTop = parseInt(snowflake.style.top, 10);
            currentTop += 2; // Adjust fall speed

            if (currentTop > gameBox.offsetHeight) {
                gameBox.removeChild(snowflake);
                snowflakes = snowflakes.filter(sf => sf !== snowflake);
            } else {
                snowflake.style.top = currentTop + 'px';
                requestAnimationFrame(fall); // Continue falling smoothly
            }
        }

        requestAnimationFrame(fall);

        snowflake.addEventListener('click', () => {
            if (!gameActive) return; // Ignore clicks if the game is not active

            snowflake.classList.remove('shine'); // Remove shine animation
            snowflake.classList.add('pop'); // Add pop animation

            // Remove snowflake after animation
            setTimeout(() => {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                gameBox.removeChild(snowflake);
                snowflakes = snowflakes.filter(sf => sf !== snowflake);
            }, 300); // Duration matches the pop animation
        });
    }

    function spawnSnowflakes(count) {
        for (let i = 0; i < count; i++) {
            createSnowflake();
        }
    }

    function updateCountdown() {
        countdownDisplay.textContent = formatTime(countdownTime);
        countdownTime--;

        if (countdownTime < 0) {
            clearInterval(spawnInterval);
            clearInterval(countdownInterval);
            gameActive = false; // End the game

            // Store the score in localStorage
            let totalScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
            totalScore += score;
            localStorage.setItem('totalScore', totalScore);

            // Show result message and options
            resultMessageElem.textContent = `You got ${score} snowflakes!`;
            resultElem.style.display = 'block';

            // Disable continue button if no tickets left
            if (tickets <= 0) {
                continueBtn.disabled = true;
            }
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function startGame() {
        if (tickets <= 0) {
            alert('You need tickets to play the game!');
            window.location.href = 'home.html'; // Redirect to home if no tickets
            return;
        }

        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        
        countdownTime = 30;
        countdownInterval = setInterval(updateCountdown, 1000);

        let phase = 0;
        spawnInterval = setInterval(() => {
            if (countdownTime > 0) {
                if (phase % 2 === 0) {
                    spawnSnowflakes(3 + Math.floor(Math.random() * 2)); // 3-4 snowflakes
                } else {
                    spawnSnowflakes(5); // 5 snowflakes
                }
                phase++;
            }
        }, 1000); // Adjust spawning frequency as needed
    }

    function handleContinue() {
        tickets--;
        localStorage.setItem('tickets', tickets);

        if (tickets <= 0) {
            // Redirect to home if no tickets left
            window.location.href = 'home.html';
        } else {
            // Reload the game with updated tickets
            window.location.reload();
        }
    }

    function handleLeave() {
        window.location.href = 'home.html'; // Redirect to home page if the player chooses to leave
    }

    // Attach event listeners to the buttons
    continueBtn.addEventListener('click', handleContinue);
    leaveBtn.addEventListener('click', handleLeave);

    startGame();
});
