import { getSquare, getColumn, getRow } from "./getSections";
import {
  sudokuBoard,
  rowOne,
  columnOne,
  squareOne,
} from "./fixtures/sudokuBoard";

describe("getSquare function", () => {
  it("returns the proper square from the sudoku array", () => {
    const expected = squareOne;
    const actual = getSquare(sudokuBoard, 1);

    expect(actual).toEqual(expected);
  });
});

describe("getColumn function", () => {
  it("returns the proper column from the sudoku array", () => {
    const expected = columnOne;
    const actual = getColumn(sudokuBoard, 0);

    expect(actual).toEqual(expected);
  });
});

describe("getRow function", () => {
  it("returns the proper row from the sudoku array", () => {
    const expected = rowOne;
    const actual = getRow(sudokuBoard, 0);

    expect(actual).toEqual(expected);
  });
});
