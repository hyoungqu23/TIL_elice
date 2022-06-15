import React from 'react';
import { Link } from 'react-router-dom';

// Nav Component

export function Nav(props) {
  const liTags = props.data.map((e) => {
    return (
      <li key={e.id}>
        <Link
          to={'/read/' + e.id}
          onClick={(evt) => {
            // evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </Link>
      </li>
    );
  });

  return (
    <nav>
      <ol>{liTags}</ol>
    </nav>
  );
}
