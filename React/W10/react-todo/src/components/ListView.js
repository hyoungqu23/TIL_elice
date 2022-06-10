import React from 'react';

const ListView = ({ todos }) => {
  return (
    <div>
      <ol>
        {todos.map((todo) => {
          return (
            <li key={todo.key}>
              <span>{todo.value}</span>
              <button type="button">완료</button>
              <button type="button">삭제</button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ListView;
