import './App.css'; // 스타일링 방법 1
import React, { useState } from 'react';
import styled from 'styled-components'; // 스타일링 방법 3
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Article } from './Article';
import { Create } from './Create';
import { MyNavStyle } from './MyNavStyle';

// MyButton Component
function MyButton(props) {
  return <MyStyledButton>{props.children}</MyStyledButton>;
}

// MyStyledButton Component with styled-components
const MyStyledButton = styled.button`
  display: block;
  padding: 1.25em 2.5em;
  margin: 1.25em;

  background-color: #52d8af;

  border: none;
  border-radius: 0.25em;

  color: #fff;
  font-size: 1.25em;
  font-weight: bold;
`;

// MyAnotherButton Component with styled-components (inherit MyStyledButton)
const MyAnotherButton = styled(MyStyledButton)`
  background-color: #d34d4d;
`;

// colorFunction (button color)
function colorFn(props) {
  if (props.primary) return 'yellow';
  if (props.secondary) return 'blue';
  if (props.warning) return 'red';
}

// colorFunction (background color)
function backgroundColorFn(props) {
  if (props.primary) return '#52d8af';
  if (props.secondary) return '#8af';
  if (props.warning) return '#c3c3c3';
}

// MyPropsButton Component with styled-components & colorFunction (inherit MyAnotherButton)
const MyPropsButton = styled(MyAnotherButton)`
  color: ${colorFn};
  background-color: ${backgroundColorFn};
`;

// App Component
function App() {
  // State
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 1, title: 'HTML5', body: 'HTML5 is ...' },
    { id: 2, title: 'CSS3', body: 'CSS3 is ...' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is ...' },
    { id: 4, title: 'React.js', body: 'React.js is ...' },
  ]);
  const [nextId, setNextId] = useState(5);

  // mode State에 따른 내용 변경
  let content = null;

  // WELCOME Mode
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>;

    // READ Mode
  } else if (mode === 'READ') {
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    content = <Article title={topic.title} body={topic.body}></Article>;

    // CREATE Mode
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(title, body) => {
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
        }}
      />
    );

    // UPDATE Mode
  } // else if (mode === 'UPDATE') {
  //   content = (
  //     <Update
  //       onUpdate={(title, body) => {
  //         const newTopic = {
  //           id,
  //           title,
  //           body,
  //         };
  //         setTopics((currentTopics) => [...currentTopics, newTopic]); // ! 아님
  //       }}
  //       // ! 아님
  //       title={topics[id - 1].title}
  //       body={topics[id - 1].body}
  //     />
  //   );
  // }

  return (
    <div>
      <Header onSelect={HandleHeader()}></Header>
      <MyNavStyle data={topics} onSelect={HandleNav()}></MyNavStyle>
      {content}
      <ButtonGroup>
        <Button
          Component={Link}
          to="/create"
          variant="outlined"
          onClick={HandleCreateButton()}
        >
          Create
        </Button>
        <Button variant="outlined" onClick={HandleUpdateButton()}>
          Update
        </Button>
      </ButtonGroup>
      <Button variant="outlined" onClick={HandleDeleteButton()}>
        Delete
      </Button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <MyButton>Styled Button 1</MyButton>
      <MyButton>Styled Button 2</MyButton>
      <MyStyledButton>Styled Button 3</MyStyledButton>
      <MyAnotherButton>Styled Button 4</MyAnotherButton>
      <MyAnotherButton as="a" href="https://google.com" target="_blank">
        Google
      </MyAnotherButton>
      <MyPropsButton primary>Primary Styled Button 5</MyPropsButton>
      <MyPropsButton secondary>Secondary Button 6</MyPropsButton>
      <MyPropsButton warning>Warning Button 7</MyPropsButton>
    </div>
  );

  function HandleUpdateButton() {
    return () => {
      setMode('UPDATE');
    };
  }

  function HandleNav() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function HandleDeleteButton() {
    return () => {
      // Delete Mode
      setMode('DELETE');
      const newTopic = topics.filter((e) => {
        // 선택한 글의 id와 같은 id를 가진 글을 제거
        if (e.id === id) {
          return false;
        } else {
          return true;
        }
      });

      // 선택한 글 삭제
      setTopics(newTopic);
      // 둘 모두 State이기 때문에 비동기적으로 처리되어 문제가 없다.
      // Welcome 페이지로 전환
      setMode('WELCOME');
    };
  }

  function HandleCreateButton() {
    return () => {
      setMode('CREATE');
    };
  }

  function HandleHeader() {
    return () => {
      setMode('WELCOME');
    };
  }
}

export default App;
