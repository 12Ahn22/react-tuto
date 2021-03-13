import React, { useState, useRef } from 'react';

const Input = () => {
  // useRef
  const nameRef = useRef();
  // useState는 객체를 관리하는 것이 좋다
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });
  // 비구조화 할당으로 추출 = 디컨스트럭션
  const { name, nickname } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    // 불변성을 지키기
    // 객체 상태를 업데이트 할 때는,
    // 기존의 상태를 복사한 후에 -> 새로운 상태로 업데이트해야된다.
    const nextInputs = {
      ...inputs, // 스프레드 문법
      [name]: value, // name 변수에 접근하려면 []를 해야된다
    };
    setInputs(nextInputs);
  };
  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    });
    // nameRef에 접근
    // current에는 현재 dom 이 담겨있음. 그 뒤는 DOM api를 쓰면된다
    // .focus(); 는 DOM api이다.
    nameRef.current.focus();
  };
  return (
    <div>
      {/* input에 name을 설정해 여러가지 input을 관리한다 */}
      <input
        ref={nameRef}
        name="name"
        type="text"
        placeholder="이름" //
        onChange={onChange}
        value={name}
      />
      <input
        name="nickname"
        type="text"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />

      <button type="button" onClick={onReset}>
        초기화
      </button>
      <div>
        이름:{name} <br />
        (닉네임): {nickname}
      </div>
    </div>
  );
};

export default Input;
