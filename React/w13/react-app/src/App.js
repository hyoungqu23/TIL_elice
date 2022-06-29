import React from 'react';
import Header from './components/UI/Header';
import Nav from './components/UI/Nav';
import Welcome from './components/ContentsList/Welcome';
import Read from './components/ContentsList/Read';

const App = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Welcome />
      <Read />
    </div>
  );
};

export default App;
