import React, { useState, useEffect } from 'react';

export default function MathQuestion({ setLeft, setRight, setOperator }) {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    const generateRandomQuestion = () => {
      const operator_list = ['+', '-'];
      let left_side = Math.floor(Math.random() * 1000);
      let right_side = Math.floor(Math.random() * 1000);
      const operator = operator_list[Math.floor(Math.random() * 2)];

      [left_side, right_side] =
        left_side > right_side
          ? [left_side, right_side]
          : [right_side, left_side];

      /* 이곳에 추가적인 코드를 작성해 generateRandomQuestion을 완성하세요. */
      setLeft(left_side);
      setRight(right_side);
      setOperator(operator);

      return { left: left_side, right: right_side, operator: operator };
    };

    const generated = generateRandomQuestion();
    setQuestion(generated);
    /* useEffect의 dependencies를 추가해주세요. */
  }, [setLeft, setRight, setOperator]);

  return (
    <div className="mathquestion">
      <span className="question-left">
        {/* 만들어진 식의 왼쪽 수가 출력되는 공간입니다. */}
        {question.left}
      </span>
      <span className="question-operator">
        {/* 만들어진 식의 연산자가 출력되는 공간입니다. */}
        {question.operator}
      </span>
      <span className="question-right">
        {/* 만들어진 식의 오른쪽 수가 출력되는 공간입니다. */}
        {question.right}
      </span>
      <span>{'= ?'}</span>
    </div>
  );
}
