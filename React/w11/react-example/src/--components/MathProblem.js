import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const GameStatus = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  READY: 'ready',
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

function MathProblem() {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [gameStatus, setGameStatus] = useState(GameStatus.READY);

  const generateProblem = () => {
    setAnswer('');
    setN1(generateRandomNumber());
    setN2(generateRandomNumber());
    setGameStatus(GameStatus.READY);
  };

  const handleSubmit = () => {
    const numberedAnswer = Number(answer);
    if (n1 + n2 === numberedAnswer) {
      setGameStatus(GameStatus.CORRECT);
    } else {
      setGameStatus(GameStatus.INCORRECT);
    }
  };

  const handleAnswerInput = (e) => {
    setAnswer(e.target.value);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  return (
    <div>
      <Problem>
        <span>{n1}</span>
        <span>+</span>
        <span>{n2}</span>
      </Problem>

      <Line />

      <AnswerSheet>
        <Equal> = </Equal>
        <AnswerInput
          id="answer"
          type="number"
          name="answer"
          value={answer}
          onChange={handleAnswerInput}
        />
        <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
      </AnswerSheet>

      <Result>
        {gameStatus === GameStatus.CORRECT
          ? '정답입니다'
          : gameStatus === GameStatus.INCORRECT
          ? '오답입니다'
          : ''}
      </Result>

      {gameStatus === GameStatus.CORRECT && (
        <ButtonController>
          <GenerateProblemButton onClick={generateProblem}>
            문제 생성
          </GenerateProblemButton>
        </ButtonController>
      )}
    </div>
  );
}

export default MathProblem;

// styled-components를 이용해 스타일을 적용하는 코드를 작성하세요.

const Problem = styled.div`
  font-size: 2rem;

  & > span:not(:first-of-type) {
    margin-left: 1rem;
  }
`;

const Line = styled.hr`
  margin: 12px 0;
`;

const AnswerSheet = styled.div`
  display: flex;
`;

const Equal = styled.div`
  align-self: center;
  font-size: 1.4rem;
`;

const AnswerInput = styled.input`
  margin-left: 12px;
  padding: 12px;
  box-sizing: border-box;
  font-size: 1.4rem;

  width: 150px;
  height: 45px;

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SubmitButton = styled.button`
  width: 80px;
  margin-left: 12px;
  height: 45px;
  background: #d3f9d8;
  font-size: 0.9rem;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  color: #495057;
`;

const Result = styled.div`
  padding: 12px 0;
  font-size: 0.8rem;
  min-height: 40px;
`;

const ButtonController = styled.div`
  margin-top: 12px;
`;

const GenerateProblemButton = styled.button`
  width: 100%;
  height: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  background: #748ffc;
  color: #fff;
`;
