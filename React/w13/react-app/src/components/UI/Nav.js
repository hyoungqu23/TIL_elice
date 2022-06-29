import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ol>
        <li>
          <Link to="/read/1">HTML5</Link>
        </li>
      </ol>
    </nav>
  );
};

export default Nav;
