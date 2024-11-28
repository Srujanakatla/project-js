const signupSection = document.getElementById("signupSection");
const loginSection = document.getElementById("loginSection");
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
    ["A", "B", "C", "D", "E", "E", "A", "B", "C", "D"],
     ["🌻","🌞","🌞","🙉","🙉","😹","😹","🎻","🎻","🌻"], // Level 3
    ["①","①","②","②","③","③","④","④","⑤","⑤","⑥","⑥","⑦","⑦","⑩","⑩"]// Level 4
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

document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    const nameRegex = /^[A-Z][a-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!nameRegex.test(name)) {
        alert("Name must start with an uppercase letter.");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert("Password must have uppercase, lowercase, a number, a symbol, and be at least 8 characters long.");
        return;
    }

    users.push({ name, email, password });
    alert("Sign-up successful! Please login.");
    signupSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("loginUsername").value.trim();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const loggedInUser = users.find((user) => user.name === name && user.email === email && user.password === password);

    if (loggedInUser) {
        alert(`Welcome, ${name}!`);
        alert("You need to accept the Terms and Conditions to play the game.");
        welcomeAudio.play();
        loginSection.classList.add("hidden");
        gameScreen.style.display = "block";
        startGame();
    } else {
        alert("Invalid login credentials.");
    }
});

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























