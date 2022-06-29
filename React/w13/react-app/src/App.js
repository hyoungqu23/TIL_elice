import React from 'react';
import Header from './components/UI/Header';
import Nav from './components/UI/Nav';
import Welcome from './components/ContentsList/Welcome';

const App = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Welcome />
    </div>
  );
};

export default App;
