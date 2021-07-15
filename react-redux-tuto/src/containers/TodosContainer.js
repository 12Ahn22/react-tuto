import React from 'react';
// UI용 컴포넌트 가져오기
import Todos from '../components/Todo';
// 스토어를 사용하기 위해서 리덕스 connect 가져오기
import { connect } from 'react-redux';
// 액션 생성 함수 가져오기
import { changeInput, insert, toggle, remove } from '../modules/todos';

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  );
};

export default connect(
  // 비구조화 할당
  // state.todos -> todos
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  }
)(TodosContainer);
