import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <StyledHeader>
      <h1>
        <Link to="/">WEB</Link>
      </h1>
    </StyledHeader>
  );
};

const NavBar = ({ menus }) => {
  const menuItems = menus.map((menu) => {
    return (
      <li key={menu.id}>
        <Link to={`/read/${menu.id}`}>{menu.title}</Link>
      </li>
    );
  });

  return (
    <StyledNavBar>
      <ul>{menuItems}</ul>
    </StyledNavBar>
  );
};

const Read = () => {
  const { id } = useParams(); // 주소에서 id 값을 추출한다.
  const [topic, setTopic] = useState({
    title: '',
    body: '',
  });

  const refreshTopic = async () => {
    const response = await fetch('http://localhost:3333/topics/' + id);
    const result = await response.json();
    setTopic(result);
  };

  useEffect(() => {
    refreshTopic();
  }, [id]);

  return (
    <article>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
      <button>Create</button>
    </article>
  );
};

const Create = () => {
  const navigate = useNavigate();

  const handleSubmitButton = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;

    const response = await fetch('http://localhost:3333/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    const result = await response.json(); // 추가한 글 정보를 받아온다.

    navigate(`/read/${result.id}`); // 상세 보기로 이동
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <h2>Create New Topic</h2>
      <label htmlFor="title">제목: </label>
      <input name="title" type="text" placeholder="제목을 작성하세요." />
      <label htmlFor="body">내용: </label>
      <textarea
        name="body"
        rows="10"
        cols="50"
        placeholder="내용을 작성하세요."
      ></textarea>
      <button type="submit">Submit</button>
    </form>
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
    <StyledApp>
      <GlobalStyle />
      <Header />
      <NavBar menus={topics} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2>Welcome</h2>
              <p>Hello, React!</p>
            </>
          }
        />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  width: 90%;
  height: 100vh;
  margin: 0 auto;
`;

const StyledHeader = styled.header`
  background-color: #333;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  a {
    color: #fff;
  }
`;

const StyledNavBar = styled.nav`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #999;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li {
    font-size: 1.2rem;
    padding: 0 10px;
    list-style: none;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`;
