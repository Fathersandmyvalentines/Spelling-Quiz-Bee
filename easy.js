let words = [];
let usedWords = [];
let correctWord = "";
let userInput = "";
let timeLeft = 20;
let timer;
let streak = 0;

fetch('correctwords.json')
  .then(response => response.json())
  .then(data => {
    words = data;
    startGame();
  })
  .catch(error => console.error('Error:', error));
  function startGame() {
  resetGame();
  }

function startTimer() {
  clearInterval(timer);
  timeLeft = 20;
  document.getElementById("timer").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up! Spelling is wrong.");
      resetGame();
    }
  }, 1000);
}
function shuffleWord() {
if (usedWords.length === words.length) {
usedWords = [];
}
let availableWords = words.filter(word => !usedWords.includes(word));
correctWord = availableWords[Math.floor(Math.random() * availableWords.length)];
usedWords.push(correctWord);
document.getElementById("word-display").textContent = "Word: ???";
let prompts = ["Can you spell?:", "Alright, spell:"];
let tts = new SpeechSynthesisUtterance();
tts.text = prompts[Math.floor(Math.random() * prompts.length)];
speechSynthesis.speak(tts);
tts.onend = speakWord;
}
function addLetter(letter) {
  if (userInput.length < correctWord.length) {
    userInput += letter;
    document.getElementById("word-box").textContent = userInput;
  }
}

function backspace() {
  userInput = userInput.slice(0, -1);
  document.getElementById("word-box").textContent = userInput;
}

function submitWord() {
clearInterval(timer);
if (userInput === correctWord) {
streak++;
updateStreak();
alert("Your spelling is correct!");
} else {
streak = 0;
updateStreak();
alert("Spelling is wrong.");
}
resetGame();
}
function resetGame() {
  userInput = "";
  document.getElementById("word-box").textContent = "";
  shuffleWord();
  startTimer();
}

function createKeyboard() {
  let keyboard = document.getElementById("keyboard");
  let qwertyRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ];
  qwertyRows.forEach(row => {
    let rowDiv = document.createElement("div");
    rowDiv.className = "row";
    row.forEach(letter => {
      let key = document.createElement("span");
      key.className = "key";
      key.textContent = letter;
            key.onclick = () => addLetter(letter);
            rowDiv.appendChild(key);
        });
        keyboard.appendChild(rowDiv);
    });
}
function speakPrompt() {
  let tts = new SpeechSynthesisUtterance();
  speechSynthesis.speak(tts);
  tts.onend = speakWord;
}

function speakWord() {
  let utterance = new SpeechSynthesisUtterance(correctWord.toLowerCase());
  utterance.lang = "en-GB";
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}
function updateStreak() {
let streakElement = document.querySelector("h4.streak");
if (!streakElement) {
streakElement = document.createElement("h4");
streakElement.className = "streak";
document.body.appendChild(streakElement);
}
streakElement.innerHTML = `🔥 ${streak}`;
if (streak >= 1000) {
streakElement.style.color = "crimson";
streakElement.style.textShadow = "0 0 5px crimson";
} else if (streak >= 100) {
streakElement.style.color = "purple";
streakElement.style.textShadow = "0 0 3px purple";
} else if (streak >= 30) {
streakElement.style.color = "blue";
streakElement.style.textShadow = "0 0 2px blue";
} else if (streak >= 10) {
streakElement.style.color = "red";
streakElement.style.textShadow = "0 0 1px red";
} else if (streak >= 2) {
streakElement.style.color = "orange";
streakElement.style.textShadow = "0 0 0.5px orange";
} else {
streakElement.style.color = "";
streakElement.style.textShadow = "";
}
}
window.onload = function() {
    createKeyboard();
    resetGame();
};
