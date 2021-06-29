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
  let newBoard = []; // new array to hold board values
  // iterate through each row in board
  for (let i = 0; i < board.length; i++) {
    newBoard.push([]); // add new row to newBoard array
    // iterate through each square in each row
    for (let j = 0; j < board[i].length; j++) {
      newBoard[i].push(board[i][j].innerText); // add the value of the square to its row in the newBoard
    }
  }
  return newBoard;
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
 * Checks if any wins occurred on the board
 * @returns {Boolean}
 */
function didWin() {
  // return hWins() || vWins() || dWins();
  return hWins();
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
