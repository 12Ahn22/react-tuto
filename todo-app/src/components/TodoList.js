import React from 'react';
// CSS
import './TodoList.scss';
// 컴포넌트 참조
import TodoListItem from './TodoListItem';

const TodoList = (props) => {
  return (
    <div className="TodoList">
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </div>
  );
};

export default TodoList;
