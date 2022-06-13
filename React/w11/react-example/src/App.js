import './App.css'; // 스타일링 방법 1
import React, { useState } from 'react';
import styled from 'styled-components'; // 스타일링 방법 3
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function MyButton(props) {
  return <MyStyledButton>{props.children}</MyStyledButton>;
}

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

const MyAnotherButton = styled(MyStyledButton)`
  background-color: #d34d4d;
`;

function colorFn(props) {
  if (props.primary) return 'yellow';
  if (props.secondary) return 'blue';
  if (props.warning) return 'red';
}

function backgroundColorFn(props) {
  if (props.primary) return '#52d8af';
  if (props.secondary) return '#8af';
  if (props.warning) return '#c3c3c3';
}

const MyPropsButton = styled(MyAnotherButton)`
  color: ${colorFn};
  background-color: ${backgroundColorFn};
`;

function Header(props) {
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
        <a
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect();
          }}
        >
          WWW
        </a>
      </h1>
    </header>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create({ onCreate }) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          // 데이터 가져오는 방법 확인~
          const title = evt.target.title.value;
          const body = evt.target.body.value;
          onCreate(title, body);
        }}
      >
        <p>
          <input name="title" type="text" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input
            type="submit"
            value="Create"
            onSubmit={(evt) => {
              evt.preventDefault();
            }}
          />
        </p>
      </form>
    </article>
  );
}

const MyNavStyle = styled(Nav)`
  background-color: #f5f5f5;
  padding: 1.25em 2.5em;
  border-bottom: 1px solid #e5e5e5;
  font-size: 1.25em;
`;

function Nav(props) {
  const liTags = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a
          href={'/read/' + e.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </a>
      </li>
    );
  });
  return (
    <nav>
      <ol>{liTags}</ol>
    </nav>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  // State화
  const [topics, setTopics] = useState([
    { id: 1, title: 'HTML5', body: 'HTML5 is ...' },
    { id: 2, title: 'CSS3', body: 'CSS3 is ...' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is ...' },
    { id: 4, title: 'React.js', body: 'React.js is ...' },
  ]);
  const [nextId, setNextId] = useState(5);

  let content = null;

  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>;
  } else if (mode === 'READ') {
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    content = <Article title={topic.title} body={topic.body}></Article>;
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = {
            // id: topics.length + 1, // 삭제 기능으로 인해 불가능
            id: nextId,
            title,
            body,
          };
          setTopics((currentTopics) => [...currentTopics, newTopic]);
          setNextId((currentNextId) => currentNextId + 1);
        }}
      />
    );
  }

  return (
    <div>
      <Header
        onSelect={() => {
          setMode('WELCOME');
        }}
      ></Header>
      <MyNavStyle
        data={topics}
        onSelect={(id) => {
          setMode('READ');
          setId(id);
        }}
      ></MyNavStyle>
      {content}
      <ButtonGroup>
        <Button
          variant="outlined"
          onClick={() => {
            setMode('CREATE');
          }}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
      <MyButton>Styled Button 1</MyButton>
      <MyButton>Styled Button 2</MyButton>
      <MyStyledButton>Styled Button 3</MyStyledButton>
      <MyAnotherButton>Styled Button 4</MyAnotherButton>
      <MyAnotherButton as="a" href="https://google.com">
        Google
      </MyAnotherButton>
      <MyPropsButton primary>Primary Styled Button 5</MyPropsButton>
      <MyPropsButton secondary>Secondary Button 6</MyPropsButton>
      <MyPropsButton warning>Warning Button 7</MyPropsButton>
    </div>
  );
}

export default App;
