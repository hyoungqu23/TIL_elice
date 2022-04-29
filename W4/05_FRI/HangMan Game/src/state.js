import { GameStatus } from "./util";

function checkGameStatus(status, charsLeft, chancesLeft, timer) {
  if (charsLeft === 0) {
    return GameStatus.WIN;
  } else if (chancesLeft === 0 || timer === 0) {
    return GameStatus.LOSE;
  }
  return status;
}

// ! 초기 상태!
export const initialState = {
  enteredCharacters: {},
  charMap: {},
  wordArr: [],
  charsLeft: 0,
  chancesLeft: 7,
  timer: 60,
  gameStatus: GameStatus.READY,
  wordLoading: false,
};

// ! Section 01 decreaseChancesLeft 함수
// ! state를 매개변수로 받아 chancesLeft(남은 기회)를 1씩 감소 시키는 함수
// export function decreaseChancesLeft(state) {
//   return { ...state, chancesLeft: state.chancesLeft - 1 }
// }

export function startGame(state) {
  return { ...state, gameStatus: GameStatus.START };
}

export function decreaseTimer(state) {
  return { ...state, timer: state.timer - 1 };
}

export function setWordLoading(state, wordLoading) {
  return { ...state, wordLoading };
}

export function initializeState(state, word) {
  // 단어를 charMap으로 변환한다.
  // charMap은 단어의 각 알파벳에 해당하는 인덱스 배열이 들어있다.
  // ex) ABC -> { A:[0], B:[1], C:[2] }
  // 공백을 제외한 모든 알파벳을 "*"로 변환해 배열로 만든다.
  // wordArr에 저장한다.
  // charsLeft는 맞추어야 할 총 알파뱃의 개수를 저장한다.
  return state;
}

export function selectCharacter(state, enteredCharacter) {
  // 입력한 알파벳은 enteredCharacters에 저장된다.
  // 입력한 알파벳이 charMap에 없다면,
  // 기회가 한번 사라지게 된다. gameStatus 를 체크한다.
  //
  // 입력한 알파벳이 charMap에 존재하면,
  // wordArr의 특정 알파벳이 "*"가 아닌 해당 알파벳으로 바뀐다.
  // charMap을 이용한다.
  // charsLeft는 줄어든다.
  // gameStatus를 체크한다.
  return state;
}