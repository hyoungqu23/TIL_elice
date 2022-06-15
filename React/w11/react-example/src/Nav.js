import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

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
    <NavWrapper>
      <ol>{liTags}</ol>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  border: 1px solid #8af;
  padding: 10px;
  margin-bottom: 10px;

  ol {
    display: flex;
    justify-content: space-around;
    list-style: none;
    align-items: center;
  }
  li {
    margin-bottom: 5px;
  }
`;
