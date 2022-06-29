import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/UI/Header';
import Nav from './components/UI/Nav';
import Control from './components/UI/Control';
import Welcome from './components/ContentsList/Welcome';
import Read from './components/ContentsList/Read';
import Create from './components/ContentsList/Create';
import Update from './components/ContentsList/Update';

const App = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

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

    const response = await fetch(`/topics`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTopic),
    });

    const data = await response.json();

    getTopicsData();
    navigate(`/read/${data.id}`);
  };

  const handleUpdate = async (id, title, body) => {
    const newTopic = {
      id,
      title,
      body,
    };

    const response = await fetch(`/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTopic),
    });

    const data = await response.json();

    getTopicsData();
    navigate(`/read/${data.id}`);
  };

  const handleDelete = async (id) => {
    await fetch('/topics/' + id, {
      method: 'DELETE',
    });

    getTopicsData();
    navigate(`/`);
  };

  return (
    <div>
      <Header />
      <Nav topics={topics} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/create" element={<Create onCreate={handleCreate} />} />
        <Route
          path="/update/:id"
          element={<Update onUpdate={handleUpdate} />}
        />
      </Routes>
      <Routes>
        <Route path="/" element={<Control />} />
        <Route path="/read/:id" element={<Control onDelete={handleDelete} />} />
      </Routes>
    </div>
  );
};

export default App;
