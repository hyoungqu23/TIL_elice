import React, { useState, useEffect } from 'react';

export default function MathResult({
  left,
  right,
  operator,
  submit,
  setIsSubmit,
}) {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    /* 사용자가 제출한 답이 정답이면 isCorrect를 true로 설정하세요. */
    if ((operator === '+' ? left + right : left - right) === submit) {
      setIsCorrect(true);
    }
  }, [left, operator, right, submit, setIsSubmit]);

  return (
    <div className="mathresult">
      <div className="mathresult-answer">
        answer=
        <span className="answer-span">
          {/* 만들어진 식의 실제 정답이 출력되는 공간입니다. */}
          {operator === '+' ? left + right : left - right}
        </span>
      </div>
      <div className="mathresult-submit">
        submit=
        <span className="submit-span">
          {/* 제출된 예상 정답이 출력되는 공간입닙다. */}
          {submit}
        </span>
      </div>
      <div className="mathresult-check">
        {/* 정답이 맞았는지 여부가 출력되는 공간입니다. */}
        {isCorrect ? 'Correct' : 'Wrong'}
      </div>
    </div>
  );
}
