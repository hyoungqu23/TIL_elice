import React, { useState, useMemo } from 'react';
import './App.css';
import Form from './components/Form';
import ListView from './components/ListView';

function App() {
  const [todos, setTodos] = useState([]);

  const isLimitReached = useMemo(() => {
    return todos.length >= 10;
  }, [todos]);

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
        disabled={isLimitReached}
      />
      {isLimitReached && (
        <div
          style={{
            padding: '8px 16px',
            border: '1px solid #FA466A',
            backgroundColor: '#feecf0',
            color: '#FA466A',
            marginBottom: 16,
          }}
        >
          ※ 할일 목록이 너무 많습니다.
        </div>
      )}
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
        disabled={isLimitReached}
      />
    </div>
  );
}

export default App;
