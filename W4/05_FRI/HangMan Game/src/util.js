export const GameStatus = {
  READY: "READY",
  START: "START",
  LOSE: "LOSE",
  WIN: "WIN",
};

export function isGameEnded(gameStatus) {
  return gameStatus !== GameStatus.START;
}

export function fetchWord() {
  return fetch("https://puzzle.mead.io/puzzle?wordCount=2")
    .then((r) => r.json())
    .then((data) => data.puzzle);
}