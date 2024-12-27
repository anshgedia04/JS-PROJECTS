const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let player1Name;
let player2Name;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Create a function to prompt for player names and initialize the game
function askPlayerNames() {
    player1Name = prompt("Enter Player 1 Name (X):");
    player2Name = prompt("Enter Player 2 Name (O):");
    if(player1Name == "" || player2Name == ""){
        alert("please entre name !!") ;
            player1Name = prompt("Enter Player 1 Name (X):");
            player2Name = prompt("Enter Player 2 Name (O):");
    }
    else{
        initGame();
    }

    
}

// Initialize the game
function initGame() {
    currentPlayer = player1Name; // Player 1 starts with X
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player is :${currentPlayer}`;
}

// Call the askPlayerNames function to get the player names
askPlayerNames();

// Swap turns between players
function swapTurn() {
    // currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;

    if(currentPlayer == player1Name) {
        currentPlayer = player2Name
    }
    else{
        currentPlayer =  player1Name
    }
    gameInfo.innerText = `${currentPlayer}'s Turn (${currentPlayer === player1Name ? 'X' : 'O'})`;
}

// Check if the game is over and who the winner is
function checkGameOver() {
    let winner = "";
    winningPositions.forEach((position) => {
        if (gameGrid[position[0]] !== "" && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) {
            winner = gameGrid[position[0]];
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"; // Disable further clicks
            });
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner) {
        gameInfo.innerText = `${winner === "X" ? player1Name : player2Name} Wins! (${winner})`;
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click", () => {
    askPlayerNames(); // Re-prompt player names for a new game
});

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer === player1Name ? "X" : "O";
        gameGrid[index] = currentPlayer === player1Name ? "X" : "O";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});
