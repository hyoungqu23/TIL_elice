import { useState } from 'react';

function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(title);
        setTitle('');
      }}
    >
      <label htmlFor="todo-title">Title</label>
      <input
        id="todo-title"
        type="text"
        name="todo-title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button type="submit">Make</button>
    </form>
  );
}

export default TodoForm;
