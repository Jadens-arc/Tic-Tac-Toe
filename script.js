const { ipcRenderer } = require("electron"); // send data from front end to backend

// if someone clicks the close button then send request to backend to close window
document.getElementById("closeButton").addEventListener("click", () => {
  ipcRenderer.send("closeApp");
});

const boardEle = document.getElementById("board");

let board = [];
let currentTurn = "X";

// fill board with squares
for (let i = 0; i < 3; i++) {
  board.push([]);
  for (let j = 0; j < 3; j++) {
    let square = document.createElement("div");
    square.classList.add("square");
    boardEle.appendChild(square);
    board[i].push(square);
  }
}

function swapTurn() {
  // swap currentTurn from X to O or vice versa
  if (currentTurn == "X") currentTurn = "O";
  else currentTurn = "X";
  document.title = currentTurn + "'s Turn"; // update app title
}

/**
 * Get new matrix of board values
 * @returns {Array}
 */
function getBoardValues() {
  // iterate through each row
  return board.map((row) => {
    // iterate through each square in each row
    return row.map((square) => {
      return square.innerText; // the value of the element in the list to the squares innerText
    });
  });
}

/**
 * Return if there were any horizontal wins on the board
 * @returns {Boolean}
 */
function hWins() {
  let sSquares = getBoardValues(); // get board squares values
  // iterate through each row
  for (let i = 0; i < sSquares.length; i++) {
    let comp = sSquares[i][0]; // get first square in row to compare others to
    let perfect = true; // defaults to true if any non matching squares are found then set to false
    // iterate through row to find non matching squares
    for (let j = 0; j < sSquares[i].length; j++) {
      // set perfect to false if current square doesn't equal comp or is empty
      if (comp != sSquares[i][j] || sSquares[i][j] == "") perfect = false;
    }
    // if perfect is still true at the end of the loop than a row of the same squares has been found and a win has occurred
    if (perfect) return true;
  }
  return false; // if after iterating through all rows and a perfect row has not been found then return false
}

/**
 * Return if there were any vertical wins on the board
 *
 * @returns {Boolean}
 */
function vWins() {
  let sBoard = getBoardValues();
  // iterate through board columns and look for perfect columns
  for (let i = 0; i < sBoard[0].length; i++) {
    let comp = sBoard[0][i]; // get first square in row to compare others to
    let perfect = true; // defaults to true if any non matching squares are found then set to false
    for (let j = 0; j < sBoard.length; j++) {
      if (comp != sBoard[j][i] || sBoard[j][i] == "") perfect = false;
    }
    if (perfect) return true;
  }
  return false;
}

function dWins() {
  let sBoard = getBoardValues();
  let comp;
  let perfect;
  // iterate through negative diagonal direction to see if perfect
  comp = sBoard[0][0];
  perfect = true;
  for (let i = 0; i < sBoard.length; i++) {
    if (sBoard[i][i] != comp || sBoard[i][i] == "") perfect = false;
  }
  if (perfect) return true;

  // iterate through positive diagonal direction to see if perfect
  comp = sBoard[0][sBoard.length - 1];
  perfect = true;
  for (let i = 0; i < sBoard.length; i++) {
    let cur = sBoard[i][sBoard.length - 1 - i];
    if (cur != comp || cur == "") perfect = false;
  }
  if (perfect) return true;

  // if no perfect diagonals have been found then return false
  return false;
}

/**
 * Checks if any wins occurred on the board
 * @returns {Boolean}
 */
function didWin() {
  // return hWins() || vWins() || dWins();
  return hWins() || vWins() || dWins();
}

board.forEach((row) => {
  row.forEach((square) => {
    square.addEventListener("click", () => {
      if (!square.innerText) {
        square.innerText = currentTurn;
        if (didWin()) alert(currentTurn + " won");
        swapTurn();
      }
    });
  });
});
