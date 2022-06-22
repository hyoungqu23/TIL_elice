import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  return (
    <div>
      <h1>Left3</h1>
      <button
        onClick={() => {
          dispatch({ type: 'UP', step: 1 });
        }}
      >
        +
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
  const count = useSelector((state) => state.value);

  return (
    <div>
      <h1>Right3</h1>
      <div>{count}</div>
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
