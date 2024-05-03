import React from 'react';
import { Todo } from './interface';

interface TodoProps {
  todo: Todo;
  onCheck: Function;
}

function TodoItem({ todo, onCheck }: TodoProps) {
  const onCheckHandler = () => {
    onCheck(todo);
  };
  return (
    <li className={todo.done ? 'checked' : ''}>
      <input type="checkbox" checked={todo.done} onChange={onCheckHandler} />
      <span>{todo.text}</span>
    </li>
  );
}

export default TodoItem;
