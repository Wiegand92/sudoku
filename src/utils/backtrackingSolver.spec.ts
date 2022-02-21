import { backtrackingSolver } from "./backtrackingSolver";
import {
  incompleteSudokuBoard,
  sudokuBoard,
  invalidSudokuBoard,
} from "./fixtures/sudokuBoard";

describe("backtrackingSolver", () => {
  it("returns puzzle when true", () => {
    const expected = sudokuBoard;
    const actual = backtrackingSolver(incompleteSudokuBoard);

    expect(actual).toEqual(expected);
  });

  it("returns false when board is invalid", () => {
    const expected = false;
    const actual = backtrackingSolver(invalidSudokuBoard);

    expect(actual).toEqual(expected);
  });
});
