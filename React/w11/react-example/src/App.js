import './App.css'; // 스타일링 방법 1
import React, { useState, useEffect } from 'react';
// import styled from 'styled-components'; // 스타일링 방법 3
import Button from '@mui/material/Button';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
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

function Control({ onDelete }) {
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
        onClick={() => {
          onDelete(id); // 그냥 함수를 작성했을 때 에러 발생했음.
        }}
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
  ]);
  const [nextId, setNextId] = useState(5);
  const navigate = useNavigate();

  // side effect를 정의함
  // useEffect는 async 함수를 사용하지 못함
  // 따라서 ()를 붙여 호출 바로 해버려야 함
  useEffect(() => {
    console.log('side Effect!');
    (async () => {
      const response = await fetch('http://localhost:3333/topics');
      const data = await response.json();
      setTopics(data);
    })();
  }, []);

  return (
    <div>
      <Header onSelect={handleHeader()}></Header>
      <Nav data={topics} onSelect={handleNav()}></Nav>
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, WEB!"></Article>}
        />
        <Route path="/Create" element={<Create onCreate={handleOnCreate} />} />
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
            <Route
              key={path}
              path={path}
              element={
                <Control
                  onDelete={(id) => {
                    handleDeleteButton(id);
                  }}
                ></Control>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );

  async function handleOnCreate(title, body) {
    // ajax
    const response = await fetch('http://localhost:3333/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // id: nextId, 자동 생성으로 필요 없음
        title,
        body,
      }),
    });

    const data = await response.json();

    // 방금 생성한 글로 사용자 이동
    navigate(`/read/${data.id}`);

    // // State가 객체인 경우, immutable하게 처리해야 한다.
    // const newTopic = {
    //   // id: topics.length + 1, // 삭제 기능으로 인해 uniqueness 훼손 가능성 존재하여 불가능
    //   id: nextId,
    //   title,
    //   body,
    // };
    // // 객체의 불변성 유지로 인해 push 메서드는 렌더링이 되지 않음(기존 배열 객체와 달라야 렌더링이 된다.)
    // // Hot Module Replacement(HMR), Reloading를 사용하여 불변성 유지를 위해 setState를 사용하여 배열을 변경하는 방법
    // setTopics((currentTopics) => [...currentTopics, newTopic]);

    // // 작성한 글 보기로 전환
    // setId(nextId);
    // setMode('READ');

    // // 다음 추가를 위한 준비
    // setNextId((currentNextId) => currentNextId + 1);
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

  function handleDeleteButton(id) {
    const newTopic = topics.filter((e) => {
      // 선택한 글의 id와 같은 id를 가진 글을 제거
      // refactoring
      return e.id === id;
    });

    // // Welcome 페이지로 전환
    // setMode('WELCOME');
    // 선택한 글 삭제
    setTopics(newTopic);
    // 둘 모두 State이기 때문에 비동기적으로 처리되어 문제가 없다.

    // 삭제 이후 홈으로 가기
    navigate('/');
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
