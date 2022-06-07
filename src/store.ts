import { readable } from "svelte/store";
import { generatePuzzle } from "./utils/generatePuzzle";

const game = readable(null, (set) => {
  generatePuzzle().then((newGame) => {
    set({ ...newGame });
  });

  return function stop() {
    return null;
  };
});

export { game };
