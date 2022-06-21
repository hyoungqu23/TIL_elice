export function loginReducer(userState, action) {
  switch (action.type) {
    // 로그인하면 유저 상태를 변경함.
    case 'LOGIN_SUCCESS':
      console.log('%c로그인!', 'color: #d93d1a;');
      return {
        ...userState,
        user: action.payload,
      };

    // 로그아웃하면 유저 상태를 null로 바꿔줌. -> 로그인 여부에 따라 Header도 변경됨
    case 'LOGOUT':
      console.log('%c로그아웃!', 'color: #d93d1a;');
      return {
        ...userState,
        user: null,
      };
    default:
      return userState;
  }
}
