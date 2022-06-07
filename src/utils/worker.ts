import { generatePuzzle } from "./generatePuzzle";

onmessage = function (e) {
  switch (e.data) {
    default:
      const { puzzleSolution, puzzle } = generatePuzzle();
      this.postMessage({ puzzleSolution, puzzle });
  }
};
