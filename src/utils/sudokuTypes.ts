export type SudokuBoard = (number | [...number[]])[][];

const testArray: SudokuBoard = [[0, [1, 2, 3]]];
const testArray2: SudokuBoard = [
  [1, 2, 3, 4],
  [1, 2, [3, 3, 3]],
];

if (typeof testArray2[2] === "number") {
  const testVar: number[] = testArray2[2];
}
