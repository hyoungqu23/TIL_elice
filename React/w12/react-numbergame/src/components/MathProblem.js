import React, { useState } from 'react';
import MathQuestion from './MathQuestion';
import MathAnswer from './MathAnswer';
import MathResult from './MathResult';

export default function MathProblem() {
  /* 만들어진 식의 왼쪽 수가 저장되는 state입니다. */
  const [left, setLeft] = useState(0);
  /* 만들어진 식의 오른쪽 수가 저장되는 state입니다. */
  const [right, setRight] = useState(0);
  /* 만들어진 식의 연산자가 저장되는 state입니다. */
  const [operator, setOperator] = useState('');
  /* 사용자가 제출한 답이 저장되는 state 입니다. */
  const [submit, setSubmit] = useState('');
  /* 답안 제출 여부를 저장하는 state 입니다. */
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <div className="mathproblem">
      <div className="mathproblem-title">MathProblem</div>
      <div className="mathproblem-content">
        <div className="mathproblem-content-question">
          <MathQuestion
            /* 전달할 props가 있다면 추가해주세요. */
            setLeft={setLeft}
            setRight={setRight}
            setOperator={setOperator}
          />
        </div>
        <div className="mathproblem-content-answer">
          <MathAnswer
            /* 전달할 props가 있다면 추가해주세요. */
            setSubmit={setSubmit}
            setIsSubmit={setIsSubmit}
          />
        </div>
      </div>
      <div className="mathproblem-footer">
        {isSubmit ? (
          <MathResult
            /* 전달할 props가 있다면 추가해주세요. */
            left={left}
            right={right}
            operator={operator}
            submit={submit}
          />
        ) : null}
      </div>
    </div>
  );
}
