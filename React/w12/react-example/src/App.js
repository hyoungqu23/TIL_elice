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
    <StyledArticle>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
    </StyledArticle>
  );
};

const Create = ({ onCreate }) => {
  const handleSubmitButton = async (event) => {
    event.preventDefault();

    // 데이터 가져오기
    const title = event.target.title.value;
    const body = event.target.body.value;

    onCreate(title, body);
  };

  return (
    <StyledForm onSubmit={handleSubmitButton}>
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
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </StyledForm>
  );
};

const Control = () => {
  const { id } = useParams();

  let contextUI = null;

  if (+id) {
    contextUI = (
      <>
        <PrimaryButton>
          <Link to={`/update/${id}`}>Update</Link>
        </PrimaryButton>
      </>
    );
  }

  return (
    <ul>
      <li>
        <PrimaryButton>
          <Link to="/create">Create</Link>
        </PrimaryButton>
      </li>
      {contextUI}
    </ul>
  );
};

const Update = ({ onUpdate }) => {
  const { id } = useParams(); // 주소에서 id 값을 추출한다.
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);

  const refreshTopic = async () => {
    const response = await fetch('http://localhost:3333/topics/' + id);
    const { title, body } = await response.json();
    setTitle(title);
    setBody(body);
  };

  useEffect(() => {
    refreshTopic();
  }, [id]);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    // 데이터 가져오기
    const title = event.target.title.value;
    const body = event.target.body.value;

    onUpdate(id, title, body);
  };

  const handleChangeTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeBodyInput = (event) => {
    setBody(event.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmitButton}>
      <h2>Update Topic</h2>
      <label htmlFor="title">제목: </label>
      <input
        name="title"
        type="text"
        placeholder="제목을 작성하세요."
        onChange={handleChangeTitleInput}
        value={title}
      />
      <label htmlFor="body">내용: </label>
      <textarea
        name="body"
        rows="5"
        cols="20"
        placeholder="내용을 작성하세요."
        onChange={handleChangeBodyInput}
        value={body}
      ></textarea>
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </StyledForm>
  );
};

function App() {
  const navigate = useNavigate();
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

  const handleCreate = async (title, body) => {
    // 추가할 데이터 전송
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

    refreshTopics();
  };

  const handleUpdate = async (id, title, body) => {
    // 추가할 데이터 전송
    const response = await fetch('http://localhost:3333/topics/' + id, {
      method: 'PUT',
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

    refreshTopics();
  };

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
        <Route path="/create" element={<Create onCreate={handleCreate} />} />
        <Route
          path="/update/:id"
          element={<Update onUpdate={handleUpdate} />}
        />
      </Routes>
      <Routes>
        {['/', '/read/:id', '/create'].map((path) => {
          return <Route path={path} element={<Control />} key={path} />;
        })}
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
  background-color: #8af;

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
  background-color: #9bf;

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

const StyledArticle = styled.article`
  padding: 20px;
  background-color: #f9f9f9;
  width: 100%;
  height: 30%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const PrimaryButton = styled.button`
  width: 15%;
  height: 50px;
  margin-bottom: 10px;
  background-color: #9bf;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;

  & > * {
    color: #fff;
  }
`;
