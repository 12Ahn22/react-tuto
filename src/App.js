import logo from './logo.svg';
import './App.css';
import Hello from './component/Hello';
import Wrapper from './component/Wrapper';
import Counter from './component/Counter';
import Input from './component/input';
import UserList from './component/userlist';
import {
	useRef,
	useState,
	useMemo,
	useCallback,
	useReducer,
	createContext,
} from 'react';
import CreateUser from './component/CreateUser';
import useInputs from './component/useInputs';
const countActiveUsers = (users) => {
	console.log('활성 사용자 수를 세는중...');
	// user중에서 active가 true인 유저로만 배열을 만들고
	// 그 배열의 길이는 active중인 유저의 수를 나타낸다.
	return users.filter((user) => user.active).length;
};

// Context 사용해보기
export const UserDispatch = createContext(null);

// app.js의 상태를 useState가 아닌 useReducer 사용해보기
const initialState = {
	// inputs: {
	// 	username: '',
	// 	email: '',
	// },
	users: [
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com',
			active: true,
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com',
			active: false,
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
			active: false,
		},
	],
};
// 리듀서 함수
function reducer(state, action) {
	switch (action.type) {
		// case 'CHANGE_INPUT':
		// 	return {
		// 		...state,
		// 		inputs: {
		// 			...state.inputs,
		// 			[action.name]: action.value,
		// 		},
		// 	};
		case 'CREATE_USER':
			return {
				inputs: initialState.inputs,
				users: state.users.concat(action.user),
			};
		case 'TOGGLE_USER':
			return {
				...state,
				users: state.users //
					.map((user) =>
						user.id === action.id ? { ...user, active: !user.active } : user
					),
			};
		case 'REMOVE_USER':
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.id),
			};
		default:
			throw new Error('Error');
	}
}
function App() {
	// useState를 사용했을 때, 코드들 전부 주석처리
	{
		// 	const [users, setUsers] = useState([
		// 	{
		// 		id: 1,
		// 		username: 'velopert',
		// 		email: 'public.velopert@gmail.com',
		// 		active: true,
		// 	},
		// 	{
		// 		id: 2,
		// 		username: 'tester',
		// 		email: 'tester@example.com',
		// 		active: false,
		// 	},
		// 	{
		// 		id: 3,
		// 		username: 'liz',
		// 		email: 'liz@example.com',
		// 		active: false,
		// 	},
		// ]);
		// const [inputs, setInputs] = useState({
		// 	username: '',
		// 	email: '',
		// });
		// const { username, email } = inputs;
		// // inputs가 업데이트 되었을 때만, 재선언되고 그렇지 않을 경우는 기존의 것을 사용한다.
		// const onChange = useCallback(
		// 	(e) => {
		// 		// console.log('e 타겟', e.target);
		// 		const { name, value } = e.target;
		// 		setInputs({
		// 			...inputs,
		// 			[name]: value,
		// 		});
		// 	},
		// 	[inputs]
		// );
		// const name = 'react';
		// const style = {
		// 	backgroundColor: 'black',
		// 	color: 'aqua',
		// 	fontSize: 24,
		// 	padding: '1rem',
		// };
		// // useRef를 사용하는 이유 ?
		// // id값이 바뀐다고해서 컴포넌트가 리렌더링 될 필요가없어서
		// const nextId = useRef(4);
		// const onCreate = useCallback(() => {
		// 	const user = {
		// 		id: nextId.current,
		// 		username,
		// 		email,
		// 	};
		// 	// 배열의 불변성을 지키면서 새로운 배열을 추가하기
		// 	// 1. 스프레드 연산자 사용하기
		// 	setUsers((users) => [...users, user]);
		// 	// 2. concat 사용하기
		// 	// 배열을 합쳐주는 메소드 이다
		// 	// setUsers(users.concat(user));
		// 	setInputs({
		// 		username: '',
		// 		email: '',
		// 	});
		// 	// console.log(nextId.current); // 4
		// 	nextId.current += 1;
		// }, [email, username]);
		// const onRemove = useCallback((id) => {
		// 	setUsers((users) => users.filter((user) => user.id !== id));
		// }, []);
		// const onToggle = useCallback((id) => {
		// 	// map을 사용해서 불변성을 지켜주기
		// 	// 특정 배열만 수정하기
		// 	setUsers((users) =>
		// 		users.map((user) =>
		// 			// map으로 users 배열을 전부 돌면서
		// 			// 내가 찾는 id가 맞는지 확인하고
		// 			// 해당 id면 active 반전
		// 			// 불변성 유지를 위해서 ...user를 사용
		// 			user.id === id ? { ...user, active: !user.active } : user
		// 		)
		// 	);
		// }, []);
		// //users가 바뀔 때만 리렌더링 되고, 그 외에는 리렌더링되지않고 이전에 값을 사용한다.
		// const count = useMemo(() => countActiveUsers(users), [users]);
	}

	const idRef = useRef(4);
	// useReducer사용하기
	const [state, dispatch] = useReducer(reducer, initialState);
	// 쓰기 편하게 비구조화 할당해주기
	const { users } = state;
	// const { username, email } = state.inputs;

	const [form, onChange, reset] = useInputs({
		username: '',
		email: '',
	});
	const { username, email } = form;

	const onCreate = useCallback(() => {
		dispatch({
			type: 'CREATE_USER',
			user: {
				id: idRef.current,
				username,
				email,
			},
		});
		idRef.current += 1;
		reset();
	}, [username, email, reset]);

	const onToggle = useCallback((id) => {
		dispatch({
			type: 'TOGGLE_USER',
			id,
		});
	}, []);

	const onRemove = useCallback((id) => {
		dispatch({
			type: 'REMOVE_USER',
			id,
		});
	}, []);

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<UserDispatch.Provider value={dispatch}>
			<Wrapper>
				<CreateUser
					Ref={idRef}
					username={username}
					email={email}
					onChange={onChange}
					onCreate={onCreate}
				/>
				<UserList users={users} />
				<Counter />
				<div>활성 사용자 수 : {count} </div>
			</Wrapper>
		</UserDispatch.Provider>
	);
}

export default App;
