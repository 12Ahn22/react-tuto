import React from 'react';
// CSS
import './TodoList.scss';
// 컴포넌트 참조
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        // onRemove를 App.js에서부터 받아서
        // App.js -> TodoList -> TodoListItem 까지 전달한다.
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          id={todo.id}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
