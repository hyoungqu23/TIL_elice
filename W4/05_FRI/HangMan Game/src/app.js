import "./app.css";
import {
    initializeState,
    initialState,
    startGame,
    decreaseTimer,
    selectCharacter,
    checkGameStatus,
    setWordLoading,
    decreaseChancesLeft,
} from "./state";
import { render } from "./components";
import { GameStatus, fetchWord, isGameEnded } from "./util";
import { fetchAllImages } from "./image-util";

const App = () => {
  // ! Section 01 초기 상태(in state.js)를 가져오기!
  let state = { ...initialState };

  let imageSources = null;

  function changeState(callback) {
    // 상태를 변경하는 함수.
    // 상태를 변경한 후에 바로 render 함수를 호출한다.

    // ! Section 01 콜백 함수를 통해 새로운 상태를 만들고, 기존 상태를 덮어쓰기 하고, 이를 바탕으로 render 함수에 넘겨 컴포넌트들을 렌더링한다.
    state = callback(state);

    // ! Section 01 이미 onClickStart를 render 함수에 넘기고 있다.
    render(state, onClickItem, onClickStart, imageSources);
  }

  // ! 01 키보드를 눌렀을 때 호출되는 함수로, 추후 작성 예정
  function onClickItem(c) {
    // 알파벳 하나를 선택하면 호출되는 함수.
    changeState((state) => selectCharacter(state, c));
  }

  // ! 01 게임을 시작했을 때 어떤 일이 발생하는 지를 가진 함수
  function onClickStart() {
    // 단어 로딩 시작시, wordLoading을 설정한다.
    // 단어를 서버로부터 가져온다.
    // 단어를 가져온 후에 인터벌을 등록한다.
    // 인터벌은 1초마다 작동하며 게임이 끝나면 인터벌을 제거한다.
    // 1초마다 timer를 감소하며 게임 상태를 체크한다.
    // 타이머를 등록하고 게임을 시작한다.

    // ! Section 01 따라서 decreaseChancesLeft 함수를 호출
    // ! 상태를 변경하기 위해서는 changeState 함수를 사용하는데, 이는 단순히 상태를 변경해주고 render 함수를 호출해주는 함수이다.
    // changeState(state => decreaseChancesLeft(state))

    // ! wordLoading 설정을 하는 setWordLoading 함수를 호출하여 상태를 현재 상태로 변경한다.
    changeState(state => setWordLoading(state, true));

    // ! 01 단어를 데이터로 받아오는 fetchWord 함수 호출
    fetchWord()
      .then(word => {
        // ! setInterval을 통해 인터벌을 등록하고, 게임이 끝났는지 여부(isGameEnded)를 통해 clearInterval을 해준다.
        const intervalId = setInterval(() => {
          // 게임이 끝났다면,
          if (isGameEnded(state.gameStatus)) {
            // 인터벌 종료
            clearInterval(intervalId);
            return
          }
          // 안끝났다면, 타이머의 시간 감소
          changeState(state => decreaseTimer(state));

          // 게임 상태 확인하기
          changeState(state => checkGameStatus(state));
        }, 1000)

        // ! 단어를 데이터로 받아오는 작업이 끝나면 로딩을 종료하기 위해 false를 넣어 상태를 변경해준다.
        changeState(state => setWordLoading(state, false));

        // ! 상태 초기화
        changeState(state => initializeState(state, word));

        // ! 게임 시작!
        changeState(state => startGame(state));
      })
  }

  fetchAllImages().then((images) => {
    imageSources = images;
    changeState((state) => state);
  });
};

export default App;