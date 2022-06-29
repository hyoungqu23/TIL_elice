import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';
import Nav from './components/UI/Nav';
import Control from './components/UI/Control';
import Welcome from './components/ContentsList/Welcome';
import Read from './components/ContentsList/Read';
import Create from './components/ContentsList/Create';

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

  const handleCreate = async (title, body) => {
    const newTopic = {
      title,
      body,
    };

    await fetch(`/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTopic),
    });

    getTopicsData();
  };

  return (
    <div>
      <Header />
      <Nav topics={topics} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/create" element={<Create onCreate={handleCreate} />} />
      </Routes>
      <Control />
    </div>
  );
};

export default App;
