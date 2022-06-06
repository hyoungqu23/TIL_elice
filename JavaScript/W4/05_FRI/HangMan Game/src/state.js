import { GameStatus, wordToMap } from "./util";

export function checkGameStatus(state) {
  if (state.charsLeft === 0) {
    return {
      ...state, 
      gameStatus: GameStatus.WIN,
    }
  } else if (chancesLeft === 0 || timer === 0) {
    return {
      ...state, 
      gameStatus: GameStatus.LOSE,
    }
  }
  return state;
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
  return { 
    ...state, 
    timer: state.timer - 1,
  };
}

export function setWordLoading(state, wordLoading) {
  return { ...state, wordLoading };
}

// ! Section 02 상태를 초기화해서 반환하는 함수 구현
export function initializeState(state, word) {
  // 단어를 charMap으로 변환한다.
  // charMap은 단어의 각 알파벳에 해당하는 인덱스 배열이 들어있다.
  // ex) ABC -> { A:[0], B:[1], C:[2] }
  // 공백을 제외한 모든 알파벳을 "*"로 변환해 배열로 만든다.
  // wordArr에 저장한다.
  // charsLeft는 맞추어야 할 총 알파뱃의 개수를 저장한다.

  // ! 02 charMap 만들기
  // ! wordToMap 함수로 구현하기\
  const charMap = wordToMap(word);

  // ! 02 wordArr 만들기
  // ! word에서 단순히 길이를 이용해 공백이 아닌 모든 곳에는 *을 삽입한다.
  const wordArr = Array.from({length: word.length})
                      .map((_, index) => word[index] === " " ? " " : "*")
                      
  // ! 02 charsLeft 만들기
  const charsLeft = Object.keys(charMap).length - 1;
  
  // ! 02 State 반환하기
  return { 
    ...initialState, 
    charMap,
    wordArr,
    charsLeft,
    gameStatus: GameStatus.START,
  };
}

// ! Section 03 
export function selectCharacter(state, enteredCharacter) {
  // 입력한 알파벳은 enteredCharacters에 저장된다.
  const enteredCharacters = {
    ...state.enteredCharacters, 
    [enteredCharacter]: true,
  }
  
  // 입력한 알파벳이 charMap에 없다면,
  // 기회가 한번 사라지게 된다. gameStatus 를 체크한다.
  if (!state.charMap[enteredCharacter]) {
    const chancesLeft = state.chancesLeft - 1;
    return {
      ...state,
      chancesLeft,
      enteredCharacters,
    }
  }

  const wordArr = [...state.wordArr]
  state.charMap[enteredCharacter].forEach(i => {
    wordArr[i] = enteredCharacter
  })
  
  const charsLeft = state.charsLeft - 1;

  return {
    ...state,
    wordArr,
    charsLeft,
    enteredCharacters,
  }
}