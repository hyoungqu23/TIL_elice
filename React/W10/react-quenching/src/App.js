import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.onSelect();
          }}
        >
          WEB
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  // props.data 배열을 통해 topics 배열에 접근할 수 있다.
  const liTags = props.data.map(({ id, title }) => {
    return (
      <li key={id}>
        <a
          href={`/read/${id}`}
          onClick={(e) => {
            e.preventDefault();
            props.onClick(id); // Closure로 인해 이벤트 핸들러에 id를 전달하는 방법(Destructuring으로 인해 id만 해도 된다. 안한다면 event.id로 전달해야 한다. 물론 map의 id를 전달해야 한다.)
          }}
        >
          {title}
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

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  // let mode = 'READ'; // 단순 지역변수
  const [mode, setMode] = useState('WELCOME'); // Destructuring, constant variable로 변경이 setMode 함수로만 가능케 함.
  const [id, setId] = useState(null);
  console.log(mode, id); // 바뀔 때만 실행된다 -> 성능 상 이점

  const topics = [
    { id: 1, title: 'HTML', body: 'HTML is Hyper Text Markup Language' },
    { id: 2, title: 'CSS', body: 'CSS is Cascading Style Sheets' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is JavaScript' },
    { id: 4, title: 'React.js', body: 'React.js is React' },
  ];

  const handleCreateBtn = (e) => {
    e.preventDefault();
    console.log('Create Button');
  };

  const handleUpdateBtn = (e) => {
    e.preventDefault();
    console.log('Update Button');
  };

  // mode의 값에 따라 content가 변경된다.
  let content = <Article title="Welcome" body="Hello, React!" />;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Welcome, React!" />;
  } else if (mode === 'READ') {
    // id에 따라 동적으로 변경되어야 한다.
    const topic = topics.filter((e) => e.id === id)[0];
    console.log(topic);
    content = <Article title={topic.title} body={topic.body} />;
  }

  return (
    <div className="App">
      <Header
        onSelect={() => {
          console.log('Header Click');
          // mode = 'WELCOME'; // mode를 변경한다. 다만, 렌더링되지 않는다. 따라서 App 함수가 다시 호출되고, 화면에 다시 렌더링하게끔 해야한다. 하지만 App()을 통해 강제로 호출하더라도 상단에서 기본값으로 적용되어 변화가 없다. -> 이렇게 하면 안되고, useState를 사용해야 한다.(상태값 변경 시 Component 재실행)
          setMode('WELCOME');
        }}
      />
      <Nav
        data={topics}
        onClick={(id) => {
          console.log('Nav Click', id); // 어떤 것을 클릭했는지 알 수 있어야 한다. -> id를 인자로 받아야 함
          // mode = 'READ';
          setMode('READ');
          setId(id);
        }}
      />
      {content}
      <ButtonGroup variant="contained">
        <Button onClick={handleCreateBtn}>Create</Button>
        <Button onClick={handleUpdateBtn}>Update</Button>
      </ButtonGroup>
      <Button
        variant="outlined"
        onClick={() => {
          console.log('Delete Button');
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
