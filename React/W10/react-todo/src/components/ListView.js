import React from 'react';
import './ListView.css';

const ListView = ({ todos, onComplete, onRemove }) => {
  return (
    <div className="listview">
      <ol>
        {todos.map((todo, index) => {
          return (
            <li key={todo.key} className={todo.isCompleted ? 'completed' : ''}>
              <span>{todo.value}</span>
              <button type="button" onClick={() => onComplete(index)}>
                완료
              </button>
              <button
                className="remove"
                type="button"
                onClick={() => onRemove(index)}
              >
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
