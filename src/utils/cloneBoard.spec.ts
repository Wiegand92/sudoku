import { cloneBoard } from "./cloneBoard";
import { sudokuBoard, emptySudokuBoard } from "./fixtures/sudokuBoard";

describe("cloneBoard", () => {
  it("returns an identical matrix", () => {
    const actual = cloneBoard(sudokuBoard);
    expect(actual).toEqual(sudokuBoard);
  });

  it("makes a deep copy and not a reference", () => {
    const actual = cloneBoard(sudokuBoard);
    actual[0][0] = 0;

    expect(actual).not.toEqual(sudokuBoard);
  });

  it("mutates target array if passed", () => {
    const targetBoard = cloneBoard(emptySudokuBoard);

    cloneBoard(sudokuBoard, targetBoard);

    expect(targetBoard).toEqual(sudokuBoard);
  });
});
