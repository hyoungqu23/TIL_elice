import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { UserStateContext, DispatchContext } from '../App';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 페이지 주소를 알기 위해 사용함.

  const userState = useContext(UserStateContext); // 현재 로그인된 유저의 정보
  const dispatch = useContext(DispatchContext); // 전역 로그인 여부 변경 함수

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 함수 -> dispatch 함수를 활용해야 한다.
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: 'LOGOUT' });
    // 기본 페이지로 돌아감.
    navigate('/');
  };

  return (
    <Nav activeKey={location.pathname}>
      <Nav.Item className="me-auto mb-5">
        <Nav.Link disabled>안녕하세요, 포트폴리오 공유 서비스입니다.</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate('/')}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate('/network')}>네트워크</Nav.Link>
      </Nav.Item>
      {/* 로그인 여부에 따라 로그아웃 버튼 렌더링 여부 결정 */}
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Header;
