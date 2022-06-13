import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header(props) {
  console.log(props);
  return (
    <header>
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
    </div>
  );
}

export default App;
