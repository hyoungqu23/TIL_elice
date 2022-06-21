import React, { useState } from 'react';

export default function MathAnswer({ setSubmit, setIsSubmit }) {
  /* 상태 관리가 필요한 경우 상태값을 정의해주세요. */
  const [res, setRes] = useState('');

  const handleChange = (e) => {
    /* 키보드 입력 이벤트에 대한 이벤트 핸들러를 작성해주세요. */
    setRes(+e.target.value);
  };

  const handleSubmit = () => {
    /* 버튼 클릭 이벤트에 대한 이벤트 핸들러를 작성해주세요. */
    if (res === '') {
      setIsSubmit(false);
      return;
    }
    setSubmit(res);
    setRes('');
    setIsSubmit(true);
  };

  return (
    <div className="mathanswer">
      <input type="text" value={res} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
