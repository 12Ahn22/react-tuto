import logo from './logo.svg';
import './App.css';
import Hello from './component/Hello';
import Wrapper from './component/Wrapper';
import Counter from './component/Counter';
import Input from './component/input';
import UserList from './component/userlist';
import { useRef, useState, useMemo, useCallback } from 'react';
import CreateUser from './component/CreateUser';

const countActiveUsers = (users) => {
	console.log('활성 사용자 수를 세는중...');
	// user중에서 active가 true인 유저로만 배열을 만들고
	// 그 배열의 길이는 active중인 유저의 수를 나타낸다.
	return users.filter((user) => user.active).length;
};

function App() {
	// user 데이터
	const [users, setUsers] = useState([
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
	]);

	const [inputs, setInputs] = useState({
		username: '',
		email: '',
	});
	const { username, email } = inputs;
	const onChange = (e) => {
		// console.log('e 타겟', e.target);
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const name = 'react';
	const style = {
		backgroundColor: 'black',
		color: 'aqua',
		fontSize: 24,
		padding: '1rem',
	};

	// useRef를 사용하는 이유 ?
	// id값이 바뀐다고해서 컴포넌트가 리렌더링 될 필요가없어서
	const nextId = useRef(4);
	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email,
		};
		// 배열의 불변성을 지키면서 새로운 배열을 추가하기
		// 1. 스프레드 연산자 사용하기
		setUsers([...users, user]);
		// 2. concat 사용하기
		// 배열을 합쳐주는 메소드 이다
		// setUsers(users.concat(user));

		setInputs({
			username: '',
			email: '',
		});
		// console.log(nextId.current); // 4

		nextId.current += 1;
	};
	const onRemove = (id) => {
		setUsers(users.filter((user) => user.id !== id));
	};

	const onToggle = (id) => {
		// map을 사용해서 불변성을 지켜주기
		// 특정 배열만 수정하기
		setUsers(
			users.map((user) =>
				// map으로 users 배열을 전부 돌면서
				// 내가 찾는 id가 맞는지 확인하고
				// 해당 id면 active 반전
				// 불변성 유지를 위해서 ...user를 사용
				user.id === id ? { ...user, active: !user.active } : user
			)
		);
	};
	//users가 바뀔 때만 리렌더링 되고, 그 외에는 리렌더링되지않고 이전에 값을 사용한다.
	const count = useMemo(() => countActiveUsers(users), [users]);
	return (
		<Wrapper>
			<CreateUser
				username={username}
				email={email}
				onCreate={onCreate}
				onChange={onChange}
			/>
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
			<Counter />
			<div>활성 사용자 수 : {count}</div>
		</Wrapper>
	);
}

export default App;
