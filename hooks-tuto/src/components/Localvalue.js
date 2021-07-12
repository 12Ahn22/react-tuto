import React, { useRef } from 'react';

export default function Localvalue() {
  // 함수형 컴포넌트에서는
  // useRef를 이용해 로컬 변수를 관리할 수 있다.
  // 로컬변수 - 렌더링과 상관없이 변할 수 있는 값
  const id = useRef(1);

  const setId = (n) => {
    id.current = n; // useRef는 변수.current에 객체를 반환해 놓는다.
  };
  const printId = () => {
    console.log(id.current);
  };
  return <div></div>;
}
