import './App.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header() {
  return (
    <header>
      <h1>
        <a href="/">WEB</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  // props.data 배열을 통해 topics 배열에 접근할 수 있다.
  const liTags = props.data.map(({ id, title }) => {
    return (
      <li key={id}>
        <a href={`/read/${id}`}>{title}</a>
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

  return (
    <div className="App">
      <Header />
      <Nav data={topics} />
      <Article title="Welcome" body="Hello, React!" />
      <ButtonGroup variant="contained">
        <Button>Create</Button>
        <Button>Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
      <img src="./logo.svg" alt="" />
      <a href="http://info.cern.ch">WEB</a>
    </div>
  );
}

export default App;
