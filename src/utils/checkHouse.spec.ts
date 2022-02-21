import { checkRow, checkColumn, checkBlock } from "./checkHouse";
import { incompleteSudokuBoard } from "./fixtures/sudokuBoard";

describe("checkRow", () => {
  it("returns true if number is not in the row", () => {
    const row = 0;
    const num = 1;

    const expected = true;
    const actual = checkRow(incompleteSudokuBoard, row, num);

    expect(actual).toEqual(expected);
  });

  it("returns false if the number is in the row", () => {
    const row = 0;
    const num = 2;

    const expected = false;
    const actual = checkRow(incompleteSudokuBoard, row, num);

    expect(actual).toEqual(expected);
  });
});

describe("checkColumn", () => {
  it("returns true if number is not in the column", () => {
    const col = 0;
    const num = 1;

    const expected = true;
    const actual = checkColumn(incompleteSudokuBoard, col, num);

    expect(actual).toEqual(expected);
  });

  it("returns false if the number is in the column", () => {
    const col = 0;
    const num = 5;

    const expected = false;
    const actual = checkColumn(incompleteSudokuBoard, col, num);

    expect(actual).toEqual(expected);
  });
});

describe("checkBlock", () => {
  it("returns true if number is not in the block", () => {
    const block = 0;
    const num = 2;

    const expected = true;
    const actual = checkBlock(incompleteSudokuBoard, block, num);

    expect(actual).toEqual(expected);
  });

  it("returns false if the number is in the block", () => {
    const block = 0;
    const num = 1;

    const expected = false;
    const actual = checkBlock(incompleteSudokuBoard, block, num);

    expect(actual).toEqual(expected);
  });
});
