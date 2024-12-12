const gameScreen = document.getElementById("gameScreen");
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const welcomeAudio = document.getElementById("welcomeAudio");
const matchAudio = document.getElementById("matchAudio");
const noMatchAudio = document.getElementById("noMatchAudio");
const giftAudio = document.getElementById("giftAudio");
const backgroundMusic = document.getElementById("backgroundMusic");
const giftSection = document.getElementById("giftSection");
const giftValue = document.getElementById("giftValue");

let score = 0;
let flippedCards = [];
let matchedPairs = 0;
let level = 1;
let timerInterval;
let timeLeft;

const levels = [
    ["A", "B", "A", "B", "C", "C"], // Level 1
    ["A", "B", "C", "D", "E", "E", "A", "B", "C", "D"], // Level 2
    ["🌻", "🌞", "🌞", "🙉", "🙉", "😹", "😹", "🎻", "🎻", "🌻"], // Level 3
    // ["①", "①", "②", "②", "③", "③", "④", "④", "⑤", "⑤", "⑥", "⑥", "⑦", "⑦", "⑩", "⑩"], // Level 4
];

const rewards = [100, 150, 200, 300]; // Rewards for each level

const backgrounds = [
    "url('https://images.freecreatives.com/wp-content/uploads/2015/04/Video-Game-Desktop-Backgrounds-2.jpg')",
        "url('https://th.bing.com/th/id/OIP.dYivJonv7UihlsDtXKduYQHaEK?rs=1&pid=ImgDetMain')",
        "url('https://i.ytimg.com/vi/iouEljb-a3k/maxresdefault.jpg')",
        "url('https://e1.pxfuel.com/desktop-wallpaper/437/1001/desktop-wallpaper-5-themes-retro-synthwave-theme-ps4.jpg')",
    ];

function startTimer(duration, onTimeUp) {
    clearInterval(timerInterval);
    timeLeft = duration;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game Over.");
            onTimeUp();
        }
    }, 1000);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard(cards) {
    gameBoard.innerHTML = "";
    const shuffledValues = shuffle([...cards]);

    shuffledValues.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchAudio.play();
        matchedPairs++;
        score += 10;
        scoreDisplay.textContent = score;
        flippedCards = [];

        if (matchedPairs === levels[level - 1].length / 2) {
            clearInterval(timerInterval);
            giftAudio.play();
            showGift();
        }
    } else {
        noMatchAudio.play();
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 1000);
    }
}

function showGift() {
    giftValue.textContent = `₹${rewards[level - 1]}`;
    giftSection.classList.remove("hidden");

    setTimeout(() => {
        giftSection.classList.add("hidden");
        level++;
        matchedPairs = 0;

        if (level <= levels.length) {
            startGame();
        } else {
            alert("Game Completed!");
            // window.location.reload();
            window.location.href = "./giftcard.html";
        }
    }, 3000);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    matchedPairs = 0;

    const levelDuration = level === 1 ? 30 : 45;
    startTimer(levelDuration, () => {
        alert("Game Over!");
        window.location.reload();
    });

    document.body.style.backgroundImage = backgrounds[level - 1];
    backgroundMusic.play();

    createBoard(levels[level - 1]);
    // window.location.href="./giftcard.html";
}

// Start the game
welcomeAudio.play();
startGame();

    // window.location.href="./giftcard.html";




// const gameScreen = document.getElementById("gameScreen");
// const gameBoard = document.getElementById("gameBoard");
// const scoreDisplay = document.getElementById("score");
// const timerDisplay = document.getElementById("timer");
// const welcomeAudio = document.getElementById("welcomeAudio");
// const matchAudio = document.getElementById("matchAudio");
// const noMatchAudio = document.getElementById("noMatchAudio");
// const giftAudio = document.getElementById("giftAudio");
// const backgroundMusic = document.getElementById("backgroundMusic");
// const giftSection = document.getElementById("giftSection");
// const giftValue = document.getElementById("giftValue");

// let score = 0;
// let flippedCards = [];
// let matchedPairs = 0;
// let level = 1;
// let timerInterval;
// let timeLeft;

// const levels = [
//     ["A", "B", "A", "B", "C", "C"], // Level 1
//     ["A", "B", "C", "D", "E", "E", "A", "B", "C", "D"], // Level 2
//     ["🌻", "🌞", "🌞", "🙉", "🙉", "😹", "😹", "🎻", "🎻", "🌻"], // Level 3
// ];

// const rewards = [100, 150, 200, 300]; // Rewards for each level

// const backgrounds = [
//     "url('https://images.freecreatives.com/wp-content/uploads/2015/04/Video-Game-Desktop-Backgrounds-2.jpg')",
//     "url('https://th.bing.com/th/id/OIP.dYivJonv7UihlsDtXKduYQHaEK?rs=1&pid=ImgDetMain')",
//     "url('https://i.ytimg.com/vi/iouEljb-a3k/maxresdefault.jpg')",
//     "url('https://e1.pxfuel.com/desktop-wallpaper/437/1001/desktop-wallpaper-5-themes-retro-synthwave-theme-ps4.jpg')",
// ];

// function saveGameState() {
//     const gameState = {
//         score,
//         level,
//         matchedPairs,
//     };
//     localStorage.setItem("memoryGame", JSON.stringify(gameState));
// }

// function loadGameState() {
//     const savedState = JSON.parse(localStorage.getItem("memoryGame"));
//     if (savedState) {
//         score = savedState.score || 0;
//         level = savedState.level || 1;
//         matchedPairs = savedState.matchedPairs || 0;
//         scoreDisplay.textContent = score;
//     }
// }

// function startTimer(duration, onTimeUp) {
//     clearInterval(timerInterval);
//     timeLeft = duration;
//     timerDisplay.textContent = `Time Left: ${timeLeft}s`;

//     timerInterval = setInterval(() => {
//         timeLeft--;
//         timerDisplay.textContent = `Time Left: ${timeLeft}s`;

//         if (timeLeft <= 0) {
//             clearInterval(timerInterval);
//             alert("Time's up! Game Over.");
//             onTimeUp();
//         }
//     }, 1000);
// }

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// function createBoard(cards) {
//     gameBoard.innerHTML = "";
//     const shuffledValues = shuffle([...cards]);

//     shuffledValues.forEach((value) => {
//         const card = document.createElement("div");
//         card.classList.add("card");
//         card.dataset.value = value;
//         card.addEventListener("click", flipCard);
//         gameBoard.appendChild(card);
//     });
// }

// function flipCard() {
//     if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
//         this.classList.add("flipped");
//         this.textContent = this.dataset.value;
//         flippedCards.push(this);

//         if (flippedCards.length === 2) {
//             checkForMatch();
//         }
//     }
// }

// function checkForMatch() {
//     const [card1, card2] = flippedCards;

//     if (card1.dataset.value === card2.dataset.value) {
//         card1.classList.add("matched");
//         card2.classList.add("matched");
//         matchAudio.play();
//         matchedPairs++;
//         score += 10;
//         saveGameState(); // Save game state
//         scoreDisplay.textContent = score;
//         flippedCards = [];

//         if (matchedPairs === levels[level - 1].length / 2) {
//             clearInterval(timerInterval);
//             giftAudio.play();
//             showGift();
//         }
//     } else {
//         noMatchAudio.play();
//         setTimeout(() => {
//             card1.classList.remove("flipped");
//             card2.classList.remove("flipped");
//             card1.textContent = "";
//             card2.textContent = "";
//             flippedCards = [];
//         }, 1000);
//     }
// }

// function showGift() {
//     giftValue.textContent = `₹${rewards[level - 1]}`;
//     giftSection.classList.remove("hidden");

//     setTimeout(() => {
//         giftSection.classList.add("hidden");
//         level++;
//         matchedPairs = 0;

//         if (level <= levels.length) {
//             startGame();
//         } else {
//             alert("Game Completed!");
//             localStorage.removeItem("memoryGame"); // Clear local storage
//             window.location.href = "./giftcard.html";
//         }
//     }, 3000);
// }

// function startGame() {
//     loadGameState(); // Load saved state
//     const levelDuration = level === 1 ? 30 : 45;
//     startTimer(levelDuration, () => {
//         alert("Game Over!");
//         localStorage.removeItem("memoryGame"); // Clear state on game over
//         window.location.reload();
//     });

//     document.body.style.backgroundImage = backgrounds[level - 1];
//     backgroundMusic.play();

//     createBoard(levels[level - 1]);
// }

// // Start the game
// welcomeAudio.play();
// startGame();









