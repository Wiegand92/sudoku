import { generateBoard, generatePuzzle } from "./generatePuzzle";

describe("generateBoard", () => {
  it("Returns a full sudoku board", async () => {
    const actual = await generateBoard();

    expect(actual.length).toEqual(9);

    for (let i = 0; i < 9; i++) {
      expect(actual[i]).not.toContain(0);
    }
  });
});

describe("generatePuzzle", () => {
  it("returns an object with a partially filled Board, and the solution", async () => {
    const actual = await generatePuzzle();
    expect(actual).toHaveProperty("puzzleSolution");
    expect(actual).toHaveProperty("puzzle");
  });

  it("returns a puzzle with holes in it", async () => {
    const actual = await generatePuzzle();
    let hasZeros = false;
    actual.puzzle.forEach((row) => {
      if (row.includes(0)) {
        hasZeros = true;
      }
    });
    expect(hasZeros).toBe(true);
  });
});
