// // Store 생성
// import { createStore } from 'redux';

// const reducer = (state, action) => {
//   if (action.type === 'UP') {
//     // 새로운 state를 업데이트
//     return { ...state, value: state.value + action.step };
//   }
//   return state;
// };

// // state 초기 값
// const initialState = {
//   value: 0,
// };

// const store = createStore(reducer, initialState);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import counterUp from './countUpSlice';
import countDown from './countDownSlice';

// slice 병합
const store = configureStore({
  reducer: {
    countUp: counterUp.reducer,
    countDown: countDown.reducer,
  },
});

export default store;
