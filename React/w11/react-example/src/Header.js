import React from 'react';
import { Link } from 'react-router-dom';

// Header Component with inline style(myHeaderStyle)
export function Header(props) {
  // 스타일링 방법 2
  const myHeaderStyle = {
    backgroundColor: '#f5f5f5',
    padding: '1.25em 2.5em',
    borderBottom: '1px solid #e5e5e5',
    fontSize: '1.25em',
  };

  return (
    <header style={myHeaderStyle}>
      <h1>
        <Link
          to="/"
          onClick={(evt) => {
            // evt.preventDefault(); 링크 내부에서는 불가능
            props.onSelect();
          }}
        >
          WWW
        </Link>
      </h1>
    </header>
  );
}
