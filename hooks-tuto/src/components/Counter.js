import React, { useReducer, useState } from 'react';

// hook를 사용해 counter 만들기
export default function Counter() {
  const [value, setValue] = useState(0);

  // useReducer 사용해서 state 관리하기
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { value: state.value + 1 };
      case 'DECREMENT':
        return { value: state.value - 1 };
      default:
        return state;
    }
  }

  return (
    <div>
      <h1>현재 카운터 값은 {value}입니다.</h1>
      {/* 이벤트 처리기로는 꼭 객체를 전달한다... */}
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>

      <h2>현재 카운터 값은 {state.value}입니다.</h2>
      {/* 이벤트 처리기로는 꼭 객체를 전달한다... */}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>+1</button>
    </div>
  );
}
