const Header = () => {
  return (
    <header>
      <h1>
        <a href="/">WEB</a>
      </h1>
    </header>
  );
};

const NavBar = () => {
  return (
    <nav>
      <ul></ul>
    </nav>
  );
};

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
    </div>
  );
}

export default App;
