import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ topics }) => {
  return (
    <nav>
      <ol>
        {topics.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link to={`/read/${id}`}>{title}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Nav;
