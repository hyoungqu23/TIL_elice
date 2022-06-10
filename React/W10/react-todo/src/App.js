import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import ListView from './components/ListView';

function App() {
  const [todos, setTodos] = useState([]);

  const handleCompleteBtn = (index) => {
    setTodos((currentTodos) => {
      const newTodos = [...currentTodos];
      newTodos[index].isCompleted = true;
      return newTodos;
    });
  };

  const handleRemoveBtn = (index) => {
    setTodos((currentTodos) => {
      const newTodos = [...currentTodos];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  return (
    <div className="App">
      <ListView
        todos={todos}
        onComplete={handleCompleteBtn}
        onRemove={handleRemoveBtn}
      />
      <Form
        onInsert={(value) =>
          setTodos((currentTodos) => {
            const newTodos = [...currentTodos];
            newTodos.push({
              key: new Date().getTime(),
              value,
              isCompleted: false,
            });
            console.log(newTodos);
            return newTodos;
          })
        }
      />
    </div>
  );
}

export default App;
