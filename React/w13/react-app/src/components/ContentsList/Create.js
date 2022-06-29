import React, { useState } from 'react';

const Create = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(title, body);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>CREATE</h2>
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="제목"
          onChange={handleTitleChange}
        />
      </div>

      <div>
        <label htmlFor="body">내용</label>
        <textarea
          type="text"
          name="body"
          id="body"
          placeholder="내용"
          onChange={handleBodyChange}
        ></textarea>
      </div>

      <button type="submit">제출</button>
    </form>
  );
};

export default Create;
