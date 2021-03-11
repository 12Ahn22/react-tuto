import React, { useState, useReducer } from 'react';

// 리듀서 함수 생성
// 상태의 업데이트 로직이 컴포넌트 밖에 존재한다
function reducer(state, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			throw new Error('unhandled action');
	}
}

const Counter = () => {
	// state
	// const [number, setNumber] = useState(0);
	// useState는 배열을 반환한다
	// 1번째 원소 = 현재상태
	// 2번째 = 현재 상태를 바꾸는 함수

	// useReducer로 state 관리하기
	// [현재상태, 액션을 발생시킬 디스패치 함수] = useReducer(내가만든리듀서함수,초기값)
	// const [state, dispatch] = useReducer(reducer, initialState, init)
	const [number, dispatch] = useReducer(reducer, 0);

	const onIncrease = () => {
		// setNumber(number + 1); // 직접적으로 state에 접근하지마시오
		//기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도
		// 값을 업데이트 할 수 있습니다.

		// 함수형 업데이트
		// setNumber((prev) => prev + 1, alert('+1을 했습니다.'));
		dispatch({
			type: 'INCREMENT',
		});
	};
	const onDecrese = () => {
		// setNumber(number - 1);
		// setNumber((prev) => prev - 1, console.log('Did Update'));
		dispatch({
			type: 'DECREMENT',
		});
	};

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrese}>-1</button>
		</div>
	);
};

export default React.memo(Counter);
// export default Counter;
