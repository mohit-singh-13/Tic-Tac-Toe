const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const player = {
    0: "X",
    1: "O",
}

// let's create a function to initialize the game
function initGame() {
    currentPlayer = player[Math.floor((Math.random() * 10) % 2)];
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    boxes.forEach(box => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    })
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function handleClick(index) {
    if (boxes[index].innerText === "") { 
        boxes[index].innerText = currentPlayer;
        
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";

        // swap turn
        swapTurn();

        // check if someone wins
        checkGameOver();
    }
}

function swapTurn() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    // We could also use forEach() loop
    for (let i=0 ; i<winningPositions.length ; i++) {
        if (gameGrid[winningPositions[i][0]] !== "" && gameGrid[winningPositions[i][1]] !== "" && gameGrid[winningPositions[i][2]] !== "") {
            if (gameGrid[winningPositions[i][0]] === gameGrid[winningPositions[i][1]] && gameGrid[winningPositions[i][0]] === gameGrid[winningPositions[i][2]]) {
                answer = winningPositions[i];

                if (gameGrid[winningPositions[i][0]] === "X")
                    answer = "X";
                else 
                    answer = "O";

                boxes.forEach(box => {
                    box.style.pointerEvents = "none";
                })

                boxes[winningPositions[i][0]].classList.add("win");
                boxes[winningPositions[i][1]].classList.add("win");
                boxes[winningPositions[i][2]].classList.add("win");

                break;
            }
        }
    }

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`
        newGameBtn.classList.add("active");
        return;
    }

    // Game tied
    let filledCount = 0;
    gameGrid.forEach(box => {
        if (box !== "") {
            filledCount++;
        }
    });

    if (filledCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click", initGame);