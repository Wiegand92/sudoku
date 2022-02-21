import { getBlock, getColumn, getRow } from "./getSections";
import {
  sudokuBoard,
  rowOne,
  columnOne,
  blockOne,
} from "./fixtures/sudokuBoard";

describe("getBlock function", () => {
  it("returns the proper block from the sudoku array", () => {
    const expected = blockOne;
    const actual = getBlock(sudokuBoard, 0);

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
