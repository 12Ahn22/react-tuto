import React, { Component } from 'react';

// const Hello = ({ name, isTrue }) => {
// 	return (
// 		<>
// 			{isTrue && <h1>True 입니다</h1>}
// 			// {false ? <h1>True 입니다</h1> : <h1>False 입니다</h1>}
// 			<div>안녕하세요 {name}</div>
// 		</>
// 	);
// };

// 클래스형 컴포넌트 사용하기
class Hello extends Component {
	static defaultProps = {
		name: '이름없음',
	};
	render() {
		const { color, isTrue, name } = this.props;
		return <div style={{ color }}>{isTrue && <b>안녕하세요 {name}</b>}</div>;
	}
}

// Hello.defaultProps = {
// 	name: '이름없음',
// };

export default Hello;
