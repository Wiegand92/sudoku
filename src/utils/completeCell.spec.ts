import { completeCell } from "./completeCell";
import { incompleteSudokuBoard } from "./fixtures/sudokuBoard";
describe("completeCell function", () => {
  it("if there is only one possibility, set the cell to that number", () => {
    const expected = 1;
    completeCell(incompleteSudokuBoard, 8, 7);
    const actual = incompleteSudokuBoard[8][7];

    expect(actual).toEqual(expected);
  });

  it("if there is more than one possibility, set the cell to an array of possiblities", () => {
    const expected = [3, 4, 6, 7, 8, 9];
    completeCell(incompleteSudokuBoard, 0, 0);
    const actual = incompleteSudokuBoard[0][0];

    expect(actual).toEqual(expected);
  });
});
