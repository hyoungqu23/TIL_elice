import React, { useState } from 'react';

const Forms = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    props.onInsert(inputValue);
    setInputValue('');
  };

  return (
    <form
      onSubmit={handleSubmitBtn}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 16,
        margin: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        style={{
          flex: 1,
          border: 'none',
          color: '#000000',
          padding: '6px 12px',
          backgroundColor: 'transparent',
        }}
        disabled={props.disabled}
      />
      <button
        type="submit"
        style={{
          border: 'none',
          borderRadius: 16,
          backgroundColor: '#3ab6bc',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '8px 16px',
        }}
      >
        등록
      </button>
    </form>
  );
};

export default Forms;
