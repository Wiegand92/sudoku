import { generateBoard, generatePuzzle } from "./generatePuzzle";

describe("generateBoard", () => {
  it("Returns a full sudoku board", () => {
    const actual = generateBoard();

    expect(actual.length).toEqual(9);

    for (let i = 0; i < 9; i++) {
      expect(actual[i]).not.toContain(0);
    }
  });
});

describe("generatePuzzle", () => {
  it("returns an object with a partially filled Board, and the solution", () => {
    const actual = generatePuzzle();
    expect(actual).toHaveProperty("puzzleSolution");
    expect(actual).toHaveProperty("puzzle");
  });

  it("returns a puzzle with holes in it", () => {
    const actual = generatePuzzle();
    let hasZeros = false;
    actual.puzzle.forEach((row) => {
      if (row.includes(0)) {
        hasZeros = true;
      }
    });
    expect(hasZeros).toBe(true);
  });
});
