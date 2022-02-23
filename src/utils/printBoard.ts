function printBoard(board) {
  let row;
  for (let i = 0; i < 9; i++) {
    row = board[i];
    if (i % 3 === 0) {
      console.log("| - - - | - - - | - - - |");
    }
    console.log(
      "|",
      row[0],
      row[1],
      row[2],
      "|",
      row[3],
      row[4],
      row[5],
      "|",
      row[6],
      row[7],
      row[8],
      "|"
    );
  }
  console.log("| _ _ _ | _ _ _ | _ _ _ |");
}

// printBoard(sudokuBoard);

export { printBoard };
// module.exports = { printBoard };
