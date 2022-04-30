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

// ! Section 02. Word Component의 메시지 생성 함수 작성하기
export function generateGameMessage(gameStatus) {
  if (gameStatus === GameStatus.LOSE) {
    return "게임에 졌습니다. 다시 시작하세요.";
  } else if (gameStatus === GameStatus.WIN) {
    return "단어를 맞췄습니다! 다시 시작하세요."
  } else if (gameStatus === GameStatus.READY) {
    return '게임을 시작하세요.'
  }
  return '';
}

export function wordToMap(word) {
  return word
          .toUpperCase()
          .split("")
          .reduce((map, c, index) => {
            if(!map[c]) map[c] = [];
            map[c].push(index);
            return map;
          }, {})
}