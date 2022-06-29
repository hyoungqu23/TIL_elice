import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';
import Nav from './components/UI/Nav';
import Welcome from './components/ContentsList/Welcome';
import Read from './components/ContentsList/Read';

const App = () => {
  const [topics, setTopics] = useState([]);

  const getTopicsData = async () => {
    const response = await fetch('/topics');
    const data = await response.json();

    setTopics(data);
  };

  useEffect(() => {
    getTopicsData();
  }, []);

  return (
    <div>
      <Header />
      <Nav topics={topics} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/read/:id" element={<Read topics={topics} />} />
      </Routes>
    </div>
  );
};

export default App;
