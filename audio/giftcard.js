document.getElementById("enhanced-button").addEventListener("click", function () {
    const congratsMessage = document.getElementById("congratsMessage");
    const congratsAudio = document.getElementById("congratsAudio");
  
    // Show the congratulations message
    congratsMessage.classList.remove("hidden");
  
    // Play the audio
    congratsAudio.play();
  });
  document.addEventListener("keydown", (event) => {
    const backgroundAudio = document.getElementById("backgroundAudio");
    if (event.code === "KeyR") {
      backgroundAudio.currentTime = 0; // Reset to the start
      backgroundAudio.play();
    }
  });
