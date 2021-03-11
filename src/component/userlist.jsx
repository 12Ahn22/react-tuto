import React, { useContext } from 'react';
import { UserDispatch } from '../App';

// 한 파일에 여러 개 컴포넌트 가능
const User = React.memo(function User({ user }) {
	const dispatch = useContext(UserDispatch);
	return (
		<div>
			<b
				onClick={() => {
					dispatch({
						type: 'TOGGLE_USER',
						id: user.id,
					});
				}}
				style={{
					color: user.active ? 'green' : 'black',
					cursor: 'pointer',
				}}
			>
				{user.username}
			</b>{' '}
			<span>({user.email})</span>
			{/* onClick=onRemove(id)처럼 쓰면 렌더링 될 때, 실행되버린다.
				함수를 넣어줘야지 함수를 호출하면 안된다.
			*/}
			<button
				onClick={() => {
					dispatch({
						type: 'REMOVE_USER',
						id: user.id,
					});
				}}
				type="button"
			>
				삭제
			</button>
		</div>
	);
});

function UserList({ users }) {
	console.log('userList 렌더링중~');
	return (
		<div>
			{users.map((user) => (
				<User user={user} key={user.id} />
			))}
		</div>
	);
}

export default React.memo(UserList, (prev, next) => next.users === prev.users);
