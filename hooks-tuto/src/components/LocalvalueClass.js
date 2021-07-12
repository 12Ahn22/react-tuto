import React, { Component } from 'react';

export default class LocalvalueClass extends Component {
  // 클래스형 컴포넌트에서 로컬 변수를 선언 할 경우
  // 그냥 써주면 된다.
  id = 1;
  setId = (n) => {
    this.id = n;
  };
  printId = () => {
    console.log(this.id);
  };

  render() {
    return <div></div>;
  }
}
