import React, { useState } from 'react';

const Forms = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    props.onInsert(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmitBtn}>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default Forms;
