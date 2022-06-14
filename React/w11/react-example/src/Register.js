import React, { useState } from 'react';
import styled from 'styled-components';

const initialState = {
  id: '',
  pw: '',
  pw_confirm: '',
};

export default function Register() {
  const [userInfo, setUserInfo] = useState(initialState);
  const [buttonString, setButtonString] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };
  const { id, pw, pw_confirm } = userInfo;

  const checkInputValues = () => {
    if (id && pw && pw_confirm) {
      if (pw === pw_confirm) {
        setIsValid(true);
        document.querySelectorAll('input').forEach((item) => {
          item.disabled = true;
        });

        setButtonString('버튼이 활성화 되었습니다!');
      } else {
        setButtonString('패스워드가 맞는지 확인하세요!');
      }
    } else {
      setButtonString('내용을 전부 입력해주세요!');
    }
  };
  return (
    <Container>
      <InfoBox>
        <InputBox>
          <div>ID</div>
          <input
            name="id"
            placeholder="ID"
            onChange={handleChange}
            value={id}
          />
        </InputBox>
        <InputBox>
          <div>Password</div>
          <input
            name="pw"
            placeholder="Password"
            onChange={handleChange}
            value={pw}
          />
        </InputBox>
        <InputBox>
          <div>Password Corfirm</div>
          <input
            name="pw_confirm"
            placeholder="Password Confirm"
            onChange={handleChange}
            value={pw_confirm}
          />
        </InputBox>
      </InfoBox>
      <Buttons>
        <CheckButton onClick={checkInputValues}>양식 확인</CheckButton>
        <RegisterButton active={isValid}>회원가입</RegisterButton>
        <p id="buttonState">{buttonString}</p>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

/* 각 주석 위치에 알맞게 컴포넌트 스타일을 정의하세요. */

/* InfoBox와 Buttons의 공통 속성들을 하나의 스타일로 정의하세요. */
const SpaceEvenlyY = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

/* InfoBox와 Buttons를 정의된 스타일을 확장해 정의하세요. */
const InfoBox = styled(SpaceEvenlyY)`
  width: 100%;
  height: 40%;
`;

const Buttons = styled(SpaceEvenlyY)`
  width: 100%;
  height: 60%;
`;

/* InputBox를 정의하고 & 를 사용해 자식 요소의 스타일을 정의하세요. */
const InputBox = styled.div`
  display: flex;
  align-items: center;

  width: 90%;

  padding: 20px;

  & > div {
    font-size: 14px;
    font-weight: bold;

    width: 50%;

    justify-self: flex-start;
  }

  & > input {
    width: 50%;

    justify-self: flex-end;
  }
`;

/* 버튼의 기본 스타일을 정의합니다. */
const Button = styled.button`
  width: 200px;
  height: 50px;

  border: none;

  font-size: 20px;
  color: black;

  background-color: lightgray;
  cursor: not-allowed;
`;

/* 버튼의 기본 스타일을 확장하여 CheckButton을 정의합니다. */
const CheckButton = styled(Button)`
  background-color: lightblue;
  cursor: pointer;
`;

/* 버튼의 기본 스타일을 확장하여 RegisterButton을 정의합니다. */
const RegisterButton = styled(Button)`
  ${({ active }) => {
    return active ? `background-color: lightgreen; cursor: pointer;` : null;
  }}
`;
