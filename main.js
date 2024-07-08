var treasureIndex;
var attempts;
var messageElement = document.getElementById("message");

var treasureImage = new Image();
treasureImage.src = "treasure.jpg";

var errorImage = new Image();
errorImage.src = "wrong.jpg";

var defaultImage = "default.jpg";

var happyGif = new Image();
happyGif.src = "happy.gif";

var cryingGif = new Image();
cryingGif.src = "crying.gif";

var resultImage = document.getElementById("result-image");

var gameImages = document.querySelectorAll(".game-image");

var correctSound = document.getElementById("correct-sound");
var wrongSound = document.getElementById("wrong-sound");

function stopSounds() {
    correctSound.pause();
    correctSound.currentTime = 0;
    wrongSound.pause();
    wrongSound.currentTime = 0;
}

function initializeGame() {
    treasureIndex = Math.floor(Math.random() * 9) + 1;
    attempts = 3;
    messageElement.innerText = "Find the One Piece!";
    gameImages.forEach(function(image) {
        image.src = defaultImage;
        image.classList.remove('disabled');
    });
    resultImage.src = defaultImage;
}

function endGame() {
    gameImages.forEach(function(image) {
        image.classList.add('disabled');
    });
}

gameImages.forEach(function(image, index) {
    image.addEventListener("click", function() {
        if (attempts > 0 && !image.classList.contains('disabled')) {
            stopSounds();
            if (index + 1 === treasureIndex) {
                image.src = treasureImage.src;
                resultImage.src = happyGif.src;
                messageElement.innerText = "Congratulations! You found the One Piece! Restarting the game...";
                correctSound.play();
                setTimeout(initializeGame, 10000); 
            } else {
                image.src = errorImage.src;
                resultImage.src = cryingGif.src;
                attempts--;
                if (attempts > 0) {
                    messageElement.innerText = "Wrong guess! Attempts left: " + attempts;
                } else {
                    messageElement.innerText = "Game over! You didn't become the Pirate King.";
                    endGame();
                }
                wrongSound.play();
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.03; 
    bgMusic.muted = false; 
});

initializeGame(); 
