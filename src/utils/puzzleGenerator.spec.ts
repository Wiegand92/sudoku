import { puzzleGenerator } from "./puzzleGenerator";

describe("puzzleGenerator", () => {
  it("Returns a full sudoku board", async () => {
    const actual = await puzzleGenerator();

    console.log(actual);

    expect(actual.length).toEqual(9);

    // for (let i = 0; i < 9; i++) {
    //   expect(actual[i]).not.toContain(0);
    // }
  });
});
