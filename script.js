var block = document.getElementById("block");
var obstacle = document.getElementById("obstacle");
var coin = document.getElementById("coin");
var flag = document.getElementById("flag");
var floor = document.getElementById("floor");

var timer = null;
var isMoving = false;
var isMovingRight = false;
var isMovingLeft = false;
var jumpInProgress = false;

document.addEventListener("keydown", startAnimation);
document.addEventListener("keyup", stopAnimation);

function startAnimation(evt){
    if (evt.keyCode == "39") {
        if (!isMoving) {
            isMoving = true;
            isMovingRight = true;
            isMovingLeft = false;
            timer = setInterval(walkRight, 30);
        } else if (isMovingLeft) {
            isMoving = true;
            isMovingLeft = false;
            isMovingRight = true;
            clearInterval(timer);
            timer = setInterval(walkRight, 30);
        }

    }

    if(evt.keyCode == "37") {
        if (!isMoving) {
            isMoving = true;
            isMovingLeft = true;
            timer = setInterval(walkLeft, 30);
        } else if (isMovingRight) {
            isMoving = true;
            isMovingRight = false;
            isMovingLeft = true;
            clearInterval(timer);
            timer = setInterval(walkLeft, 30);
        }
    }

    if (evt.keyCode == "38") {
        if (!jumpInProgress) {
            block.classList.remove("jumpAnimation")
            void block.offsetWidth; // reinicia a animação
            block.classList.add("jumpAnimation")
            jumpInProgress = true;

            block.addEventListener("animationend", function() {
                jumpInProgress = false;
            });

        }
        checkCollision();
    }
}

function stopAnimation(evt){
    if (evt.keyCode == "39") {
        if (isMoving) {
            isMoving = false;
            clearInterval(timer);
        }
    }

    if (evt.keyCode == "37") {
        if (isMoving) {
            isMoving = false;
            clearInterval(timer);
        }
    }
}

function walkRight(){
    var currentLinearPosition = parseInt(block.style.left) || 0;
    var newLinearPosition = currentLinearPosition + 5;
    block.style.left = `${newLinearPosition}px`

    checkCollision();
}

function walkLeft(){
    var currentLinearPosition = parseInt(block.style.left) || 0;
    var newLinearPosition = currentLinearPosition - 5;
    block.style.left = `${newLinearPosition}px`

    checkCollision();
}

function checkCollision(){
    var blockRect = block.getBoundingClientRect();
    var obstacleRect = obstacle.getBoundingClientRect();
    var coinRect = coin.getBoundingClientRect();
    var flagRect = flag.getBoundingClientRect();

    if(
        blockRect.left < obstacleRect.right &&
        blockRect.right > obstacleRect.left &&
        blockRect.top < obstacleRect.bottom &&
        blockRect.bottom > obstacleRect.top
    ) {
        window.alert("You Lost");
        clearInterval(timer);
        isMoving == false;
        block.style.left = 0 + "px"
        coin.style.display = "block"
    }

    if (
        blockRect.left < coinRect.right &&
        blockRect.right > coinRect.left &&
        blockRect.top < coinRect.bottom &&
        blockRect.bottom > coinRect.top
    ) {
        coin.style.display = "none"
    }

    if (
        blockRect.left < flagRect.right &&
        blockRect.right > flagRect.left &&
        blockRect.top < flagRect.bottom &&
        blockRect.bottom > flagRect.top
    ) {
        window.alert("YOU WON THE GAME!");
        clearInterval(timer);
        isMoving == false;
        block.style.left = 0 + "px";
        coin.style.display = "block"
    }
}