import './App.css'; // 스타일링 방법 1
import React, { useState } from 'react';
// import styled from 'styled-components'; // 스타일링 방법 3
import Button from '@mui/material/Button';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import { Header } from './Header';
import { Article } from './Article';
import { Create } from './Create';
import { Nav } from './Nav';

function Read({ topics }) {
  // id 값을 가져오기 위해 useParams Hook 사용, App 밖에 존재해 App 내부의 state에 접근 불가
  const { id } = useParams();

  const topic = topics.filter((e) => {
    // refactoring
    return e.id === +id;
  })[0];

  return <Article title={topic.title} body={topic.body}></Article>;
}

function Control() {
  const { id } = useParams();
  let contextUI = id ? (
    <>
      <Button
        variant="outlined"
        // onClick={handleUpdateButton()}
      >
        Update
      </Button>
      <Button
        variant="outlined"
        // onClick={handleDeleteButton()}
      >
        Delete
      </Button>
    </>
  ) : (
    ''
  );
  return (
    <>
      <Button
        component={Link}
        to="/create"
        variant="outlined"
        // onClick={handleCreateButton()}
      >
        Create
      </Button>
      {contextUI}
    </>
  );
}

// App Component
function App() {
  // State
  // react-router-dom이 대체
  const [mode, setMode] = useState('WELCOME'); // TODO 삭제 예정
  const [id, setId] = useState(null); // TODO 삭제 예정
  const [topics, setTopics] = useState([
    { id: 1, title: 'HTML5', body: 'HTML5 is ...' },
    { id: 2, title: 'CSS3', body: 'CSS3 is ...' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is ...' },
    { id: 4, title: 'React.js', body: 'React.js is ...' },
  ]);
  const [nextId, setNextId] = useState(5);

  return (
    <div>
      <Header onSelect={handleHeader()}></Header>
      <Nav data={topics} onSelect={handleNav()}></Nav>
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, WEB!"></Article>}
        />
        <Route
          path="/Create"
          element={<Create onCreate={handleOnCreate()} />}
        />
        <Route path="/read/:id" element={<Read topics={topics}></Read>} />
      </Routes>
      {/* 버튼 UI 수정 방법 1 - 가능은 하지만, 중복이 심하고, URL parameter를 가져올 수 없다. */}
      {/* <Routes>
        <Route
          path="/"
          element={
            <Button
              component={Link}
              to="/create"
              variant="outlined"
              onClick={handleCreateButton()}
            >
              Create
            </Button>
          }
        />
        <Route
          path="/read/:id"
          element={
            <>
              <Button
                component={Link}
                to="/create"
                variant="outlined"
                onClick={handleCreateButton()}
              >
                Create
              </Button>
              <Button variant="outlined" onClick={handleUpdateButton()}>
                Update
              </Button>
              <Button variant="outlined" onClick={handleDeleteButton()}>
                Delete
              </Button>
            </>
          }
        />
      </Routes> */}

      {/* 버튼 UI 수정 2 개선안 */}
      <Routes>
        {['/', '/read/:id', '/update/:id'].map((path) => {
          return (
            <Route key={path} path={path} element={<Control></Control>}></Route>
          );
        })}
      </Routes>
    </div>
  );

  function handleOnCreate() {
    return (title, body) => {
      // State가 객체인 경우, immutable하게 처리해야 한다.
      const newTopic = {
        // id: topics.length + 1, // 삭제 기능으로 인해 uniqueness 훼손 가능성 존재하여 불가능
        id: nextId,
        title,
        body,
      };
      // 객체의 불변성 유지로 인해 push 메서드는 렌더링이 되지 않음(기존 배열 객체와 달라야 렌더링이 된다.)
      // Hot Module Replacement(HMR), Reloading를 사용하여 불변성 유지를 위해 setState를 사용하여 배열을 변경하는 방법
      setTopics((currentTopics) => [...currentTopics, newTopic]);

      // 작성한 글 보기로 전환
      setId(nextId);
      setMode('READ');

      // 다음 추가를 위한 준비
      setNextId((currentNextId) => currentNextId + 1);
    };
  }

  function handleUpdateButton() {
    return () => {
      setMode('UPDATE');
    };
  }

  function handleNav() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function handleDeleteButton() {
    return () => {
      // Delete Mode
      setMode('DELETE');
      const newTopic = topics.filter((e) => {
        // 선택한 글의 id와 같은 id를 가진 글을 제거
        // refactoring
        return e.id === id;
      });

      // 선택한 글 삭제
      setTopics(newTopic);
      // 둘 모두 State이기 때문에 비동기적으로 처리되어 문제가 없다.
      // Welcome 페이지로 전환
      setMode('WELCOME');
    };
  }

  function handleCreateButton() {
    return () => {
      setMode('CREATE');
    };
  }

  function handleHeader() {
    return () => {
      setMode('WELCOME');
    };
  }
}

export default App;
