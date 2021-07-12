import React, { useEffect, useReducer, useState } from 'react';
// 커스텀 훅스 가져와서 사용해보기
import useInputs from './useInputs';

// useReducer로 state 관리해보기
// 리듀서에 사용할 리듀서 함수 - 바깥에 선언 가능
// function reducer(state, action) {
//   return {
//     ...state,
//     [action.name]: action.value,
//   };
// }
export default function Info() {
  // const [name, setName] = useState('');
  // const [nickname, setNickname] = useState('');

  // 리듀서 사용하기
  // [상태,상태사용하기위한 디스패치] = useReducer(리듀서함수, 기본값)
  // const [state, dispatch] = useReducer(reducer, {
  //   name: '',
  //   nickname: '',
  // });
  // useRecucer의 state를 구조 분해 할당.

  // 커스텀 훅스로 useReducer 대체하기
  const [state, onChange] = useInputs({
    name: '',
    nickname: '',
  });

  const { name, nickname } = state;
  // 이벤트 처리기
  // const onChange = (e) => {
  //   dispatch(e.target);
  // };

  useEffect(() => {
    console.log('렌더링이 완료되었습니다.');
    console.log({ name, nickname });
  });

  useEffect(() => {
    console.log('마운트 될 때만 실행된다.');
  }, []);

  useEffect(() => {
    console.log('특정 props,state가 변화할 때만 실행된다.');
    console.log('cleanup!');
    // 클린업 함수
    // 언마운트와 업데이트 직전에 실행되는 내용들이다.
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  }, [name]);

  const onChangeName = (e) => {
    // setName(e.target.value);
  };
  const onChangeNickName = (e) => {
    // setNickname(e.target.value);
  };
  return (
    <div>
      <input
        type='text'
        name='name'
        value={name}
        placeholder='이름을 입력하세요'
        onChange={onChange}
      />
      <input
        type='text'
        name='nickname'
        value={nickname}
        placeholder='닉네임을 입력하세요'
        onChange={onChange}
      />
    </div>
  );
}
