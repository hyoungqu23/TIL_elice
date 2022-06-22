import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import countUp, { up } from './countUpSlice';
import countDown from './countDownSlice';
import './App.css';

function Left1() {
  return (
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  );
}

function Left2() {
  return (
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  );
}

function Left3() {
  const dispatch = useDispatch();
  const countUpValue = useSelector((state) => state.countUp.value);
  return (
    <div>
      <h1>Left3</h1>
      {/* <button
        onClick={() => {
          // dispatch({type: "countUp/up", payload: 2});
          // action create function 만들면 다음과 같음 function up(step) return {type: "countUp/up", payload: step}
          // dispatch(up(2));
          // redux toolkit이 자동으로 생성해주므로 다음과 같이 작성하면 된다.
          console.log(countUp);
          console.log(countUp.actions);
          dispatch(up(2));
        }}
      >
        +
      </button> */}
      <button
        onClick={async () => {
          const resp = await fetch('http://localhost:3333/countUp', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: countUpValue + 1 }),
          });
          const result = await resp.json();
          dispatch(countUp.actions.up(1));
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(countDown.actions.down(2));
        }}
      >
        -
      </button>
    </div>
  );
}

function Right1() {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}

function Right2() {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}

function Right3() {
  // store의 state 값 중 필요한 값만 선택하는 Hook.
  // 선택한 state 값이 변경될 때만 다시 렌더링된다.
  const countUp = useSelector((state) => state.countUp.value);
  const countDown = useSelector((state) => state.countDown.value);

  return (
    <div>
      <h1>Right3</h1>
      <div>
        {countUp} | {countDown}
      </div>
    </div>
  );
}

export default function App() {
  // const [count, setCount] = useState(0);
  // const countReducer = (state, action) => {
  //   if (action.type === 'UP') {
  //     return { ...state, value: state.value + action.step };
  //   }
  //   return state;
  // };

  // const initialState = {
  //   value: 0,
  // };

  // const [count, dispatch] = useReducer(countReducer, initialState);

  // const up = (step) => {
  //   return { type: 'UP', step: step };
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const resp = await fetch('http://localhost:3333/countUp');
      const result = await resp.json();
      dispatch(countUp.actions.set(result.value));
    })();
  }, []);

  return (
    <div id="app">
      <h1>Root</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Left1 onUp={() => {}}></Left1>
        <Right1></Right1>
      </div>
    </div>
  );
}
