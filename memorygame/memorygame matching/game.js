const gameScreen = document.getElementById("gameScreen");
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const welcomeAudio = document.getElementById("welcomeAudio");
const matchAudio = document.getElementById("matchAudio");
const noMatchAudio = document.getElementById("noMatchAudio");
const giftAudio = document.getElementById("giftAudio");
const giftSection = document.getElementById("giftSection");
const giftImage = document.getElementById("giftImage");

let users = [];
let score = 0;
let flippedCards = [];
let matchedPairs = 0;
let level = 1;
let timerInterval;
let timeLeft;

const levels = [
    ["A", "B", "A", "B", "C", "C"], // Level 1
    ["A", "B", "C", "D", "E", "E", "A", "B", "C", "D"], // Level 2
];

function startTimer(duration, onTimeUp) {
    clearInterval(timerInterval);
    timeLeft = duration;
    const timerElement = document.createElement("p");
    timerElement.id = "timer";
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    gameScreen.appendChild(timerElement);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

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
            alert("Congratulations! Level completed.");
            alert(`Gift card for Level ${level}!`);
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
    giftSection.classList.remove("hidden");

    setTimeout(() => {
        giftSection.classList.add("hidden");
        level++;
        matchedPairs = 0;

        if (level <= levels.length) {
            startGame();
        } else {
            alert("Game Completed!");
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

    createBoard(levels[level - 1]);
}























