document.addEventListener('DOMContentLoaded', () => {
    const totalScoreElem = document.getElementById('total-score');
    const snowingScoreElem = document.getElementById('snowing-score');
    const timeLeftElem = document.getElementById('time-left');
    const snowingButton = document.getElementById('snowing-button');
    const playBtn = document.getElementById('play-btn');
    const ticketsContent = document.getElementById('tickets-content');
    const gameResultElem = document.getElementById('game-result');

    let snowingScore = 0;
    let countdownInterval;
    let farmingInterval;
    let countdownTime = 8 * 60 * 60; // 8 hours in seconds
    let farmingStarted = false;
    const maxFarmingPoints = 100; // Total points to be farmed
    const ticketInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const maxTickets = 5; // Maximum number of tickets

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
                snowingScore = Math.min(snowingScore, maxFarmingPoints); // Cap snowingScore at 100
                snowingScoreElem.innerText = snowingScore.toFixed(3);
                gameResultElem.innerHTML = `You have accumulated ${snowingScore.toFixed(3)} snowflakes!<br><br>
                    <button id="continue-btn">CONTINUE PLAYING</button><br>
                    <button id="leave-btn">LEAVE GAME</button>`;
                
                // Handle continue and leave buttons
                document.getElementById('continue-btn').addEventListener('click', () => {
                    let tickets = parseInt(localStorage.getItem('tickets') || '0', 10);
                    if (tickets > 0) {
                        tickets--;
                        localStorage.setItem('tickets', tickets);
                        updateTickets();
                        window.location.href = 'game.html'; // Redirect to game page
                    }
                });

                document.getElementById('leave-btn').addEventListener('click', () => {
                    window.location.href = 'home.html'; // Redirect to home page
                });

                // Update total score in localStorage
                let totalScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
                totalScore += snowingScore;
                localStorage.setItem('totalScore', totalScore);
                totalScoreElem.innerText = `Total Score: ${totalScore.toFixed(3)}`;

                playBtn.disabled = false; // Enable the play button
                updateTimerDisplay(0);
                return;
            }
            countdownTime--;
            updateTimerDisplay(countdownTime);
        }, 1000);
    }

    function startFarming() {
        const farmingRate = maxFarmingPoints / (8 * 60 * 60); // Farming rate to distribute 100 points over 8 hours

        farmingInterval = setInterval(() => {
            if (countdownTime > 0) {
                snowingScore = Math.min(snowingScore + farmingRate, maxFarmingPoints); // Increment snowing score up to maxFarmingPoints
                snowingScoreElem.innerText = snowingScore.toFixed(3);
            }
        }, 1000); // Update every second
    }

    function handleSnowingButtonClick() {
        if (!farmingStarted) {
            startCountdown(); // Start countdown as soon as farming starts
            startFarming(); // Start farming process
            farmingStarted = true; // Prevent restarting farming
            snowingButton.style.pointerEvents = 'none'; // Disable button after starting
        }
    }

    function initializeTickets() {
        let tickets = parseInt(localStorage.getItem('tickets') || '0', 10);
        if (tickets === 0) {
            tickets = maxTickets; // Give 5 tickets on first launch
            localStorage.setItem('tickets', tickets);
            localStorage.setItem('lastUpdate', Date.now().toString());
        }
        updateTickets(); // Update tickets and button status
    }

    function updateTickets() {
        let tickets = parseInt(localStorage.getItem('tickets') || '0', 10);
        const lastUpdate = parseInt(localStorage.getItem('lastUpdate') || '0', 10);

        // Check if 24 hours have passed
        if (Date.now() - lastUpdate >= ticketInterval) {
            tickets = Math.min(tickets + 5, maxTickets); // Add 5 tickets, up to a maximum of 5
            localStorage.setItem('tickets', tickets);
            localStorage.setItem('lastUpdate', Date.now().toString());
        }

        // Update UI with capital letters and no period
        ticketsContent.textContent = `YOU HAVE ${tickets} TICKETS`;
        playBtn.disabled = tickets <= 0; // Enable or disable play button based on ticket count

        // If no tickets are available, disable the play button and show a message
        if (tickets <= 0) {
            playBtn.disabled = true;
            ticketsContent.textContent += ' - YOU NEED TO WAIT FOR MORE TICKETS';
        }
    }

    function handleGameEnd(score) {
        gameResultElem.innerHTML = `You got ${score} snowflakes!<br><br>
            <button id="continue-btn">CONTINUE PLAYING</button><br>
            <button id="leave-btn">LEAVE GAME</button>`;
        
        document.getElementById('continue-btn').addEventListener('click', () => {
            // Remove a ticket and redirect to game page
            let tickets = parseInt(localStorage.getItem('tickets') || '0', 10);
            if (tickets > 0) {
                tickets--;
                localStorage.setItem('tickets', tickets);
                updateTickets();
                window.location.href = 'game.html'; // Redirect to game page
            }
        });

        document.getElementById('leave-btn').addEventListener('click', () => {
            // Redirect to home page
            window.location.href = 'home.html'; // Redirect to home page
        });
    }

    function startGame() {
        const ticketCount = parseInt(localStorage.getItem('tickets') || '0', 10);
        if (ticketCount <= 0) {
            alert('Tickets are needed to play the game');
            window.location.href = 'home.html'; // Redirect to home page if no tickets
            return;
        }

        // Deduct a ticket and start the game
        if (ticketCount > 0) {
            localStorage.setItem('tickets', ticketCount - 1);
            updateTickets();
        }

        const gameBox = document.getElementById('gameBox');
        const scoreDisplay = document.getElementById('score');
        const countdownDisplay = document.getElementById('countdown');

        let score = 0;
        let countdownTime = 30; // Countdown in seconds
        let countdownInterval;
        let spawnInterval;
        let snowflakes = []; // Array to track snowflakes

        function getRandomSize() {
            const sizes = ['big', 'normal']; // Removed 'small'
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
            snowflake.classList.add('snowflake');
            
            const size = getRandomSize();
            snowflake.classList.add(size);
            snowflake.innerHTML = '<i class="fas fa-snowflake snowflake-icon"></i>'; // Font Awesome snowflake icon

            const sizeMapping = { big: 50, normal: 30 };
            const snowflakeSize = sizeMapping[size];
            
            let positionValid = false;
            let x, y;
            const maxAttempts = 10;

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
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                gameBox.removeChild(snowflake);
                snowflakes = snowflakes.filter(sf => sf !== snowflake);
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

                // Store the score in localStorage
                let totalScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
                totalScore += score;
                localStorage.setItem('totalScore', totalScore);

                // Update total score display
                totalScoreElem.innerText = `Total Score: ${totalScore.toFixed(3)}`;

                // Handle end of game
                handleGameEnd(score);
            }
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        function startGamePlay() {
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

        startGamePlay();
    }

    // Add event listener to the snowing button
    snowingButton.addEventListener('click', handleSnowingButtonClick);

    // Initialize tickets and timer display
    initializeTickets();
    updateTimerDisplay(countdownTime);

    // Handle active nav item
    const navItems = document.querySelectorAll('.footer .icon-box');
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page

    navItems.forEach(nav => {
        const href = nav.getAttribute('href');
        if (currentPage === href) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    // Start the game when the play button is clicked
    playBtn.addEventListener('click', () => {
        const ticketCount = parseInt(localStorage.getItem('tickets') || '0', 10);
        if (ticketCount <= 0) {
            alert('You need tickets to play the game. Please wait for more tickets.');
            return; // Prevent game start if no tickets
        }
        startGame();
    });

    // Display total score on the home page
    const totalScoreElemHome = document.getElementById('total-score');
    if (totalScoreElemHome) {
        let totalScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
        totalScoreElemHome.textContent = totalScore.toFixed(3); // Display with 3 decimal places
    }
});
