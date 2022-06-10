import React from 'react';

const ListView = ({ todos, onComplete, onRemove }) => {
  return (
    <div>
      <ol>
        {todos.map((todo, index) => {
          return (
            <li key={todo.key}>
              <span>{todo.value}</span>
              <button type="button" onClick={() => onComplete(index)}>
                완료
              </button>
              <button type="button" onClick={() => onRemove(index)}>
                삭제
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ListView;
