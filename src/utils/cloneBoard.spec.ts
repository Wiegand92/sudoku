import { cloneBoard } from "./cloneBoard";
import { sudokuBoard } from "./fixtures/sudokuBoard";

describe("cloneBoard", () => {
  it("returns an identical matrix", () => {
    const expected = cloneBoard(sudokuBoard);
    expect(expected).toEqual(sudokuBoard);
  });

  it("makes a deep copy and not a reference", () => {
    const expected = cloneBoard(sudokuBoard);
    expected[0][0] = 0;

    expect(expected).not.toEqual(sudokuBoard);
  });
});
