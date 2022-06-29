import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';
import Nav from './components/UI/Nav';
import Welcome from './components/ContentsList/Welcome';
import Read from './components/ContentsList/Read';

const App = () => {
  const [topics, setTopics] = useState([]);

  const getTopicsData = async () => {
    const url = 'http://localhost:3333/topics';

    const response = await fetch(url);
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
        <Route path="/read/1" element={<Read />} />
      </Routes>
    </div>
  );
};

export default App;
