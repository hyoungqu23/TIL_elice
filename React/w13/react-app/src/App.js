import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/UI/Header';
import Nav from './components/UI/Nav';
import Welcome from './components/ContentsList/Welcome';
import Read from './components/ContentsList/Read';

const App = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/read/1" element={<Read />} />
      </Routes>
    </div>
  );
};

export default App;
