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
  if (currentTurn == "X") currentTurn = "O";
  else currentTurn = "X";
  document.title = currentTurn + "'s Turn";
}

function hWins() {
  board.forEach((row) => {
    let didWin = false;
    let comp = row[0];
    if (comp.innerText == "") return;
    row.forEach((square) => {
      didWin = square.innerText == comp.innerText;
    });
  });
}

function didWin() {
  // return hWins() || vWins() || dWins();
  return hWins();
}

board.forEach((row) => {
  row.forEach((square) => {
    square.addEventListener("click", () => {
      if (!square.innerText) {
        square.innerText = currentTurn;
        if (didWin) alert(currentTurn + " won");
        swapTurn();
      }
    });
  });
});
