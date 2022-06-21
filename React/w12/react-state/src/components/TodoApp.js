import React, { useState } from 'react';
import TodosPage from './TodosPage';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [globalId, setGlobalId] = useState(3000);

  const toggleTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (title) => {
    setTodos((todos) => [{ title, id: globalId + 1 }, ...todos]);
    setGlobalId((id) => id + 1);
  };

  return (
    <TodosPage
      state={{ todos, filter }}
      toggleTodo={toggleTodo}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      changeFilter={setFilter}
    />
  );
}

export default TodoApp;
