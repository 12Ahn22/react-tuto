import React, { Component } from 'react';

class ClassCounter extends Component {
	constructor(props) {
		super(props);
		// 클래스 컴포넌트에서 state는 무조곤 객체여야한다.
		this.state = {
			counter: 0,
		};
		this.handleIncrease = this.handleIncrease.bind(this);
	}

	handleIncrease() {
		console.log(this); // undefined가 된다.
		// 생성자 함수에서 this 바인딩을 해줘야 this가 컴포넌트가 된다.
		this.setState({
			counter: this.state.counter + 1,
		});
	}
	handleDecrease = () => {
		// 화살표 함수로 만들면 this가 컴포넌트가 된다.
		console.log(this);
		this.setState({
			counter: this.state.counter - 1,
		});
	};
	render() {
		return (
			<div>
				<h1>{this.state.counter}</h1>
				<button onClick={this.handleIncrease}>+1</button>
				<button onClick={this.handleDecrease}>-1</button>
			</div>
		);
	}
}
export default ClassCounter;
