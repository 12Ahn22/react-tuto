// 커스텀 훅스
import { useState, useCallback, useReducer } from 'react';

function reducer(state, action) {
	switch (action.type) {
		case 'CHANGE_INPUT':
			return {
				...state,
				[action.name]: action.value,
			};
		case 'RESET_INPUT':
			// state의 key값(username,email)을 배열로 뽑아서 =>
			// reduce 메소드를 실행
			// acc(누산기) 객체에 현재 키(username,email)을 넣은 값을 ''로 만드는 것
			// acc[username]=''; 그 다음은 acc[username]='';
			// acc를 리턴함, acc가 state가 됨 acc = {username:'',email:''}인 객체
			//
			return Object.keys(state).reduce((acc, current) => {
				// console.log('현재상태', typeof Object.keys(state)); //object
				//
				// console.log('acc', acc); //object
				// console.log('acc type', typeof acc);

				acc[current] = '';
				return acc;
			}, {});
		default:
			throw new Error('없는 타입입니다.');
	}
}

function useInputs(initialForm) {
	// useState를 쓴 버전
	// const [form, setForm] = useState(initialForm);
	// const onChange = useCallback((e) => {
	// 	const { name, value } = e.target;
	// 	setForm((form) => ({ ...form, [name]: value }));
	// }, []);
	// const reset = useCallback(() => setForm(initialForm), [initialForm]);
	// return [form, onChange, reset];

	// useReducer 써보기
	const [form, dispatch] = useReducer(reducer, initialForm);

	// onChage
	const onChange = useCallback((e) => {
		const { name, value } = e.target;
		dispatch({
			type: 'CHANGE_INPUT',
			name,
			value,
		});
	}, []);

	// reset
	const reset = useCallback(() => {
		dispatch({
			type: 'RESET_INPUT',
		});
	}, []);

	return [form, onChange, reset];
}

export default useInputs;
