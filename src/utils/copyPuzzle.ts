function copyPuzzle(source, target = []) {
  source.forEach((row, rowIndex) => {
    const newRow = [];
    row.forEach((col, colIndex) => {
      newRow.push(source[rowIndex][colIndex]);
    });
    target.push(newRow);
  });
  return target;
}

export { copyPuzzle };
