import {
  GameStatus,
  isGameEnded,
  generateGameMessage,
} from "./util";
import { calculateImageSize } from './image-util'
import { h, id } from "./dom";

export const HangmanImage = (chancesLeft, images) => {
  const container = id("hangman-image");
  const context = container.getContext("2d");
  context.clearRect(0, 0, container.width, container.height);

  images.slice(chancesLeft).map((item, idx) => {
    context.drawImage(
      item.image,
      item.dx,
      item.dy,
      ...calculateImageSize(item.image.width, item.image.height, 70)
    );
  });
};

// ! Section 02 Word Component 구현
export const Word = (GameStatus, wordArr) => {
  const container = id("word");
  container.innerHTML = "";

  const wordText = h("div");
  wordText.classList.add("word-text");

  // 게임이 끝났다면, 게임이 끝났다는 메시지를 보여준다.
  // ! 02 게임이 끝났는지 판단하기 위해서는 GameStatus 값과 isGameEnded() 함수가 필요하다.
  if (isGameEnded(GameStatus)) {
    const message = h('p');
    // ! 02 GameStatus에 따른 메시지 구현 -> 새로운 함수 generateGameMessage
    message.innerText = generateGameMessage(GameStatus);
    wordText.appendChild(message);
  }
  // 진행되고 있는 경우, `wordArr`를 이용해 각 글자를 보여준다.
  // ! 02 게임이 진행되고 있는 경우, wordArr를 활용한다.
  // ! 02 wordArr 예시 : ["C", "*", "*", "D"]

  const spans = wordArr.map(c => {
    const span = h('span');    // ! 02 parameter 태그를 생성하는 DOM 함수
    if (c !== " ") {
      // 공백을 제외한 글자들은 character 라는 클래스를 가진다.
      span.classList.add('character');
    }
    span.innerText = c;         // ! 02 span 태그 내에는 해당 알파벳을 할당
    return span
  })

  // wordText 안에 글자들을 구성한다.
  wordText.append(...spans);          // ! 02 모든 span 태그를 삽입
  container.appendChild(wordText);    // ! 02 wordText를 container에 삽입
};

// ! Section 03 키보드레이아웃 컴포넌트 구현
export const KeyboardLayout = (gameStatus, enteredCharacters, onClickItem) => {
  const container = id("keyboard-layout");
  container.innerHTML = "";

  const ul = h("ul");
  ul.classList.add("keyboard-layout");

  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((c) => {
      const li = h("li");
      const button = h("button");

      // 버튼을 누를 때, 선택한 문자를 함수로 전달한다.
      // 게임이 종료되었거나, 이미 누른 문자라면 해당 버튼을 누르지 못하게 한다.
      button.classList.add("keyboard-button");
      button.innerText = c;

      // ! 03 버튼 클릭 이벤트 추가
      button.addEventListener('click', () => onClickItem(c))

      // ! 03 게임이 종료되었거나, 누른 문자의 경우 비활성화
      button.disabled = isGameEnded(gameStatus) || enteredCharacters[c]

      li.appendChild(button);
      return li;
    })
    .forEach((node) => ul.appendChild(node));

  container.appendChild(ul);
};

// ! Section 01 ButtonBox modified
// ! ButtonBox 함수에 onClickStart 함수를 매개변수로 받아, 시작 버튼인 button에 이벤트 리스너를 추가한다.
// ! 행맨 이미지가 추가될 때 좌상단의 Chances의 숫자도 연동되어야 한다. 따라서, ButtonBox에 chancesLeft를 매개변수로 받아 고정된 부분을 변수로 바꿔준다.

// ! Section 02 ButtonBox 구현하기
export const ButtonBox = (wordLoading, gameStatus, chancesLeft, timer, onClickStart) => {
  const container = id("button-box");
  container.innerHTML = "";

  // 남은 기회를 보여주는 텍스트를 만든다.
  const chances = h("div");
  chances.classList.add("chances-text");
  
  // ! 매개변수로 수정
  chances.innerText = `Chances: ${chancesLeft}`;

  // 남은 시간을 보여준다.
  const timerText = h("div");
  timerText.classList.add("timer-text");
  timerText.innerText = timer;

  // 게임 시작 버튼.
  // 아직 단어가 로딩중이거나, 게임이 끝나지 않았다면 버튼을 누르지 못하게 한다.
  // 버튼을 누르면 게임이 시작된다.
  const button = h("button");
  button.classList.add("start-button");
  button.innerText = "START";
  
  // ! 시작 버튼 클릭 시 onClickStart 함수가 실행될 수 있도록 이벤트 리스너 추가
  button.addEventListener('click', onClickStart);
  
  // ! 단어가 로딩 중이거나 게임이 끝나지 않으면 시작 버튼은 비활성화
  button.disabled = wordLoading || !isGameEnded(gameStatus);

  container.append(chances, timerText, button);
};

export function render(state, onClickItem, onClickStart, imageSources) {
  KeyboardLayout(state.gameStatus,state.enteredCharacters, onClickItem);
  Word(state.gameStatus, state.wordArr);            // ! 매개변수 추가
  ButtonBox(state.wordLoading, state.gameStatus, state.chancesLeft, state.timer, onClickStart);      // ! render 함수에서도 매개변수로 onClickStart 받는 것 추가, 현재 상태의 chancesLeft를 받는 것 추가
  HangmanImage(state.chancesLeft, imageSources);
}