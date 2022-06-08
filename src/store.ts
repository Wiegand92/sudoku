import { readable, writable } from "svelte/store";

const puzzleSolution = writable([]);
const puzzle = writable([]);
const playerSolution = writable([]);
const moves = writable([]);
const solved = writable(false);
const timeStarted = 0;
