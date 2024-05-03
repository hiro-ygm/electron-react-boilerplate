import React, { useEffect } from 'react';
import TodoItem from './Todo';
import { Todo } from './interface';
import './App.css';

interface ElectronWindow extends Window {
  db: {
    loadTodoList: () => Promise<Array<Todo> | null>;
    storeTodoList: (todoList: Array<Todo>) => Promise<void>;
  };
}
declare const window: ElectronWindow;

function HomeScreen() {
  const [text, setText] = React.useState('');
  const [todos, setTodos] = React.useState<Array<Todo>>([]);
  // データ操作
  // ToDoリストを読み込み
  const loadTodoList = async (): Promise<Array<Todo> | null> => {
    const todoList = await window.db.loadTodoList();
    return todoList;
  };

  // ToDoリストを保存
  const storeTodoList = async (todoList: Array<Todo>): Promise<void> => {
    await window.db.storeTodoList(todoList);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('load todo list');
    loadTodoList()
      .then((todoList) => {
        if (todoList) {
          setTodos(todoList);
        }
        return [];
      })
      .catch(() => {
        return [];
      });
  }, []);

  const handleAddTodo = () => {
    if (!text) {
      return;
    }
    const newTodo: Array<Todo> = [
      { id: new Date().getTime(), text, done: false },
      ...todos,
    ];
    setTodos(newTodo);
    storeTodoList(newTodo);
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
    storeTodoList(newTodos);
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
