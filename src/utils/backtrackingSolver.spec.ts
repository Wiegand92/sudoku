import { backtrackingSolver } from "./backtrackingSolver";
import {
  incompleteSudokuBoard,
  easySudokuBoard,
  sudokuBoard,
  invalidSudokuBoard,
  multipleSolutionsBoard,
} from "./fixtures/sudokuBoard";

describe("backtrackingSolver", () => {
  it("returns 1 when only one solution", () => {
    const expected = 1;
    const actual = backtrackingSolver(incompleteSudokuBoard).count;

    expect(actual).toEqual(expected);
  });

  it("returns 0 when board is invalid", () => {
    const expected = 0;
    const actual = backtrackingSolver(invalidSudokuBoard).count;

    expect(actual).toEqual(expected);
  });

  it("returns 2 when more than one solution", () => {
    const expected = 2;
    const actual = backtrackingSolver(multipleSolutionsBoard).count;

    expect(actual).toEqual(expected);
  });
});
