import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

function TodosPage({ state, addTodo, deleteTodo, toggleTodo, changeFilter }) {
  const filteredTodos = state.todos.filter((todo) => {
    const { filter } = state;
    return (
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'todo' && !todo.completed)
    );
  });

  return (
    <div>
      <h3>TodosPage</h3>
      <TodoForm onSubmit={addTodo} />
      <TodoFilter filter={state.filter} changeFilter={changeFilter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default TodosPage;
