import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Control = () => {
  const { id } = useParams();

  return (
    <ul>
      <li>
        <Link to="create">Create</Link>
      </li>
      {id && (
        <li>
          <Link to="update">Update</Link>
        </li>
      )}
    </ul>
  );
};

export default Control;
