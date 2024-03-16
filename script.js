const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPostion = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initialGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        box.classList = `box box${index + 1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player -  ${currentPlayer}`;
}

initialGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

function checkGameOver() {

    let answer = "";
    winningPostion.forEach((position) => {
        //all boxes should be non empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {

            //checking winners
            if (gameGrid[position[0]] === 'X') {
                answer = "X";
            }
            else {
                answer = "O";
            }
            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //giving winner green background colour i.e win class
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner 
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //ensure game is tied
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    })
    //after tie ,restart button
    if (fillCount === 9) {
        gameInfo.innerText = "Game tied ! ";
        newGameBtn.classList.add("active");
    }

};


function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}



boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

//initailzes new game
newGameBtn.addEventListener("click", initialGame);