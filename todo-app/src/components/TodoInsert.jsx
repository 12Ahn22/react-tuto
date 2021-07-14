// rsc
import React, { useCallback, useState } from 'react';
// icon
import { MdAdd } from 'react-icons/md';
// CSS
import './TodoInsert.scss';

// App.js가 props로 onInsert를 보내준다.
const TodoInsert = ({ onInsert }) => {
  // 1. 처리할 데이터 구조 정의하기
  const [value, setValue] = useState('');
  // 이벤트 처리기
  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  // submit 이벤트 처리기
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');

      // submit은 브라우저 자체적으로 새로고침을 하기 때문에
      // 디폴트 이벤트를 중단 시켜야한다
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        onChange={onInputChange}
        value={value}
      />
      {/* type이 submit이면 submit 이벤트가 발생한다.*/}
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
