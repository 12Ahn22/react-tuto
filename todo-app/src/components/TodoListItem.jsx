import React from 'react';
// react-icons
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import './TodoListItem.scss';
// classnames
import cn from 'classnames';

const TodoListItem = ({ todo, id, onRemove, onToggle }) => {
  // 비구조화할당
  const { text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div
        onClick={() => {
          onToggle(id);
        }}
        className={cn('checkbox', { checked })}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}

        <div className="text">{text}</div>
      </div>
      <div
        className="remove"
        onClick={() => {
          onRemove(id);
        }}
      >
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
