const basket = document.getElementById("basket");
const fallingObject = document.getElementById("fallingObject");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

let basketX = 160;
let fallingX = Math.random() * 380;
let fallingY = 0;
let score = 0;
let gameInterval;

function moveBasket(event) {
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= 20;
    } else if (event.key === "ArrowRight" && basketX < 320) {
        basketX += 20;
    }
    basket.style.left = basketX + "px";
}

function updateGame() {
    fallingY += 5;
    fallingObject.style.top = fallingY + "px";
    fallingObject.style.left = fallingX + "px";

    if (fallingY >= 480) {
        // Check if the basket catches the object
        if (fallingX >= basketX && fallingX <= basketX + 80) {
            score++;
            scoreDisplay.textContent = score;
        } else {
            endGame();
            return;
        }
        // Reset object position
        fallingY = 0;
        fallingX = Math.random() * 380;
    }
}

// End Game Function
function endGame() {
    alert("Game Over! Your Score: " + score);
    clearInterval(gameInterval);
    restartButton.style.display = "block"; // Show restart button
}

// Restart Game Function
function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    basketX = 160;
    fallingX = Math.random() * 380;
    fallingY = 0;
    basket.style.left = basketX + "px";
    fallingObject.style.top = fallingY + "px";
    restartButton.style.display = "none"; // Hide restart button
    gameInterval = setInterval(updateGame, 50);
}

// Back Button Function
function goBack() {
    window.history.back();
}

document.addEventListener("keydown", moveBasket);
gameInterval = setInterval(updateGame, 50);
