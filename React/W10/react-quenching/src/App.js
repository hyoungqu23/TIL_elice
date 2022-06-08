import './App.css';
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
            props.onClick();
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

  return (
    <div className="App">
      <Header
        onSelect={() => {
          console.log('Header Click');
        }}
      />
      <Nav
        data={topics}
        onClick={() => {
          console.log('Nav Click');
        }}
      />
      <Article title="Welcome" body="Hello, React!" />
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
      <img src="./logo.svg" alt="" />
      <a href="http://info.cern.ch">WEB</a>
    </div>
  );
}

export default App;
