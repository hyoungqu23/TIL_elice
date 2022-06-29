import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Control = ({ onDelete }) => {
  const { id } = useParams();

  return (
    <ul>
      <li>
        <Link to="create">Create</Link>
      </li>
      {id && (
        <>
          <li>
            <Link to={`/update/${id}`}>Update</Link>
            <button
              onClick={() => {
                onDelete(id);
              }}
            >
              Delete
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Control;
