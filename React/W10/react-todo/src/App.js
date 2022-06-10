import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import ListView from './components/ListView';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <ListView todos={todos} />
      <Form
        onInsert={(value) =>
          setTodos((currentTodos) => {
            const newTodos = [...currentTodos];
            newTodos.push({
              key: new Date().getTime(),
              value,
              isCompleted: false,
            });
            return newTodos;
          })
        }
      />
    </div>
  );
}

export default App;
