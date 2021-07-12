import React, { Component } from 'react';
import './ClassValidation.css';

// 클래스 컴포넌트에서 ref사용하기
export default class ClassValidation extends Component {
  // state
  state = {
    password: '',
    clicked: false,
    validated: false,
  };

  handleChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000',
    });
  };
  render() {
    return (
      <div>
        <input
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validated
                ? 'success'
                : 'failure'
              : ''
          }
        />
        <button onClick={this.handleButtonClick}>확인</button>
      </div>
    );
  }
}
