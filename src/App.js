import logo from './logo.svg';
import './App.css';
import Hello from './component/Hello';
import Wrapper from './component/Wrapper';
import Counter from './component/Counter';
import Input from './component/input';
import UserList from './component/userlist';
import { useRef, useState } from 'react';
import CreateUser from './component/CreateUser';

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
		</Wrapper>
	);
}

export default App;
