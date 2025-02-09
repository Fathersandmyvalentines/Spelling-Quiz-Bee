document.addEventListener("DOMContentLoaded", function () {
    // Get username from URL
    let urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get("user") || "Guest";

    // Display welcome message
    document.getElementById("welcome-message").innerText = `Welcome, ${username}!`;

    // Show loading screen based on connection speed
    if (navigator.onLine) {
        let speed = getConnectionSpeed();
        let delay = speed === "fast" ? 500 : speed === "slow" ? 2000 : 1500;
        document.getElementById("loading-screen").style.display = "flex";
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
        }, delay);
    }

    // Unique localStorage keys per user
    let playTimeKey = `playTime_${username}`;
    let wordsCorrectKey = `wordsCorrect_${username}`;
    let bestStreakKey = `bestStreak_${username}`;

    // Initialize stats if not set
    if (!localStorage.getItem(playTimeKey)) localStorage.setItem(playTimeKey, 0);
    if (!localStorage.getItem(wordsCorrectKey)) localStorage.setItem(wordsCorrectKey, 0);
    if (!localStorage.getItem(bestStreakKey)) localStorage.setItem(bestStreakKey, 0);

    let playTime = parseInt(localStorage.getItem(playTimeKey));
    let wordsCorrect = parseInt(localStorage.getItem(wordsCorrectKey));
    let bestStreak = parseInt(localStorage.getItem(bestStreakKey));
    let startTime = Date.now();
    let currentStreak = 0;

    // Update stats display
    document.querySelector("h3:nth-of-type(2)").innerText = `Words Corrected: ${wordsCorrect}`;
    document.querySelector("h3:nth-of-type(3)").innerText = `Play Time Count: ${formatTime(playTime)}`;
    document.querySelector("h3:nth-of-type(4)").innerText = `Best Streak: ${bestStreak}`;

    // Update play time every second
    setInterval(() => {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        localStorage.setItem(playTimeKey, playTime + elapsedTime);
    }, 1000);

    // Function to handle word submission
    window.submitWord = function (userInput, correctWord) {
        clearInterval(timer);
        if (userInput === correctWord) {
            currentStreak++;
            wordsCorrect++;
            alert("Your spelling is correct!");

            // Update best streak if higher
            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
                localStorage.setItem(bestStreakKey, bestStreak);
            }
        } else {
            currentStreak = 0;
            alert("Spelling is wrong.");
        }

        localStorage.setItem(wordsCorrectKey, wordsCorrect);
        resetGame();
    };
});

// Detect connection speed without fetching files
function getConnectionSpeed() {
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        if (connection.downlink >= 5) return "fast";
        if (connection.downlink < 2) return "slow";
    }
    return "unknown";
}

// Format time into HH:MM:SS
function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

// Fade-out navigation effects
function fadeOutAndNavigate2(event, url) {
    event.preventDefault();
    let button = event.target;
    button.classList.add("glitch");
    setTimeout(() => {
        document.body.classList.add("glitch-body");
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }, 500);
}

function fadeOutAndNavigate(event, url) {
    event.preventDefault();
    let button = event.target;
    button.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

// Difficult mode animation
document.querySelector(".difficult-mode").addEventListener("click", () => {
    document.body.classList.add("glitch-body");
    setTimeout(() => {
        document.body.classList.remove("glitch-body");
    }, 1000);
});