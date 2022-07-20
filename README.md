# Sudoku

## How to install locally

- Clone the project
- Run npm install
- Run npm start

## Technologies

- [x] Typescript
- [x] Webpack
- [x] Svelte
- [x] Jest
- [x] TailwindCSS

## Todo

- [x] Setup webpack w/babel, typescript, and frontend tech
- [x] Create sudoku solver
  - [x] Helper functions
  - [x] Backtracking Algorithm
  - [ ] One Cell Constraint Algorithm
- [x] Create sudoku generator (dependent on solver)

  ### Front-end

  - [ ] Create front-end (Svelte)
    - [x] Board
      - [x] NumberInput
      - [x] Note
    - [ ] Controls
      - [x] NumberButtons
      - [x] HistoryButtons
      - [x] NewGameButton
      - [ ] EraserButton

  ### Game Features

  - [ ] Difficulty levels
  - [x] Input numbers as notes
  - [ ] Keyboard controls
    - [ ] Number keys to set numberSelected
    - [ ] Arrow keys to move around board
  - [ ] Mobile functionality
    - [ ] Override VirtualKeyboard with custom controls
  - [ ] Hints (?)

## Resources

- [How to create a solver](https://javascript.plainenglish.io/solve-a-sudoku-using-javascript-de456e8c34a5?gi=fc3c9b37abcc)
