import { writable } from "svelte/store";
// Conflicts object for clearly wrong answers //
const conflicts = writable(null);
// History of player moves //
const moves = writable([]);
// How many times the back button is used //
const movesRewound = writable(0);
// Is the puzzle finished //
const solved = writable(false);
// Which numberButton is currently active //
const numberSelected = writable(null);
// Holds any notes the player has made //
const playerNotes = writable([]);
// Is the player taking notes //
const takeNotes = writable(false);
// Is the Eraser active //
const eraserActive = writable(false);
