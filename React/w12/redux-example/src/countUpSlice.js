import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  // action의 type 값으로 활용될 이름
  name: 'countUp',

  // 초기 값
  initialState: {
    value: 0,
  },

  // reducer 함수 설정
  reducers: {
    up: (state, action) => {
      // 불변성 고민하지 말고 값 변경 가능(immer 사용)
      state.value = state.value + action.payload;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default slice;
export const { up } = slice.actions;
