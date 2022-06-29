import React from 'react';
import { useParams } from 'react-router-dom';

const Read = ({ topics }) => {
  const param = useParams();

  let selectedTopic = topics.filter(({ id }) => {
    return id === +param.id;
  })[0];

  return (
    <article>
      <h2>{selectedTopic.title}</h2>
      <p>{selectedTopic.body}</p>
    </article>
  );
};

export default Read;
