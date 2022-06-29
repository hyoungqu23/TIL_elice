import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Update = ({ onUpdate }) => {
  const param = useParams();
  const id = +param.id;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const selectTopic = async () => {
    const response = await fetch('/topics/' + id);
    const data = await response.json();
    setTitle(data.title);
    setBody(data.body);
  };

  useEffect(() => {
    selectTopic();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(id, title, body);
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
          value={title}
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
          value={body}
          onChange={handleBodyChange}
        ></textarea>
      </div>

      <button type="submit">수정</button>
    </form>
  );
};

export default Update;
