import React from 'react';

// 여러개의 컴포넌트를 하나의 파일에 선언가능
const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input
        type='checkbox'
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly={true}
      />
      {/* 스타일 안에 삼항연산자 가능 */}
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button
        onClick={() => {
          onRemove(todo.id);
        }}
      >
        삭제
      </button>
    </div>
  );
};

const Todos = ({
  input,
  todos,
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(input);
    // 등록 후 인풋 초기화
    onChangeInput('');
  };
  const onChange = (e) => onChangeInput(e.target.value);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type='submit'>등록</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
