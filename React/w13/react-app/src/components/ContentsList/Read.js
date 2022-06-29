import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Read = () => {
  const param = useParams();
  const id = +param.id;
  const [topic, setTopic] = useState({ title: null, body: null });

  const selectTopic = async () => {
    const response = await fetch('/topics/' + id);
    const data = await response.json();
    setTopic(data);
  };

  useEffect(() => {
    selectTopic();
  }, [id]);

  return (
    <article>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
    </article>
  );
};

export default Read;
