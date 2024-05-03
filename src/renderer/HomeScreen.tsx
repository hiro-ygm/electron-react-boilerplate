import React, { useEffect } from 'react';
import TodoItem from './Todo';
import { Todo } from './interface';
import './App.css';

function HomeScreen() {
  const [text, setText] = React.useState('');
  const [todos, setTodos] = React.useState<Array<Todo>>([]);
  useEffect(() => {
    const defaultTodos = [
      { id: 1, text: 'Learn React', done: false },
      { id: 2, text: 'Learn TypeScript', done: false },
    ];
    setTodos(defaultTodos);
  }, []);

  const handleAddTodo = () => {
    setTodos([...todos, { id: todos.length + 1, text, done: false }]);
    setText('');
  };

  const onCheck = (newTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <div className="container">
        <div className="input-field">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddTodo}
            className="add-todo-button"
          >
            Add
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onCheck={onCheck} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeScreen;
