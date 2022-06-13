import './App.css'; // 스타일링 방법 1
import { Children, useState } from 'react';
import styled from 'styled-components'; // 스타일링 방법 3
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function MyButton(props) {
  return <button>{props.children}</button>;
}

function Header(props) {
  console.log(props);

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

  console.log(mode, id);

  const topics = [
    { id: 1, title: 'HTML5', body: 'HTML5 is ...' },
    { id: 2, title: 'CSS3', body: 'CSS3 is ...' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is ...' },
    { id: 4, title: 'React.js', body: 'React.js is ...' },
  ];

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
  }

  return (
    <div>
      <Header
        onSelect={() => {
          setMode('WELCOME');
        }}
      ></Header>
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode('READ');
          setId(id);
        }}
      ></Nav>
      {content}
      <ButtonGroup>
        <Button
          variant="outlined"
          onClick={() => {
            alert('create!');
          }}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
      <MyButton>Styled Button 1</MyButton>
      <MyButton>Styled Button 2</MyButton>
      <MyButton>Styled Button 3</MyButton>
    </div>
  );
}

export default App;
