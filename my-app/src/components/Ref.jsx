import React, { Component } from 'react';

export default class Ref extends Component {
  // createRef를 사용해서 쉽게 ref를 설정할 수 있다.
  input = React.createRef(); // input이 ref다.

  handleFocus = () => {
    this.input.current.focus();
  };
  handleCallbackFocus = () => {
    this.callbackRef.focus();
  };
  render() {
    return (
      <div>
        {
          // 1. 콜백함수 사용해서 ref 설정하기
        }
        <input
          ref={(ref) => {
            this.callbackRef = ref;
          }}
        />
        <button onClick={this.handleCallbackFocus}>콜백 포커스 버튼</button>

        {
          // createRef 사용하기
          // 2. input이라는 ref와 연결된 input 태그
        }
        <input ref={this.input} />
        <button onClick={this.handleFocus}>포커스 버튼</button>
      </div>
    );
  }
}
