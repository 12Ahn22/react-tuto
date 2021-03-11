import React, { useState } from 'react';

const Counter = () => {
	// state
	const [number, setNumber] = useState(0);
	// useState는 배열을 반환한다
	// 1번째 원소 = 현재상태
	// 2번째 = 현재 상태를 바꾸는 함수

	const onIncrease = () => {
		// setNumber(number + 1); // 직접적으로 state에 접근하지마시오
		//기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도
		// 값을 업데이트 할 수 있습니다.

		// 함수형 업데이트
		setNumber((prev) => prev + 1);
	};
	const onDecrese = () => {
		// setNumber(number - 1);
		setNumber((prev) => prev - 1);
	};

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrese}>-1</button>
		</div>
	);
};

export default Counter;
