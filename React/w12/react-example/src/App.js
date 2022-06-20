import React, { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';

const Header = () => {
  return (
    <header>
      <h1>
        <a href="/">WEB</a>
      </h1>
    </header>
  );
};

const NavBar = ({ menus }) => {
  const menuItems = menus.map((menu) => {
    return (
      <li key={menu.id}>
        <a href={`/read/${menu.id}`}>{menu.title}</a>
      </li>
    );
  });

  return (
    <nav>
      <ul>{menuItems}</ul>
    </nav>
  );
};

function App() {
  const [topics, setTopics] = useState([]);

  const refreshTopics = async () => {
    const response = await fetch('http://localhost:3333/topics');
    const result = await response.json();
    setTopics(result);
  };

  // useEffect의 콜백 함수에는 async를 직접 사용하지 못하므로, 따로 함수를 생성 후 호출해야 한다.
  useEffect(() => {
    refreshTopics();
  }, []); // 최초 1회 실행

  return (
    <div className="App">
      <Reset />
      <Header />
      <NavBar menus={topics} />
    </div>
  );
}

export default App;
