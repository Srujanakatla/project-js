function showFinalPopup() {
    const completionPopup = document.getElementById("completionPopup");
    completionPopup.classList.remove("hidden");
}

function reloadGame() {
    window.location.reload();
}

// Update the showGift function to check if it's the final level
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
            showFinalPopup();
        }
    }, 3000);
}
