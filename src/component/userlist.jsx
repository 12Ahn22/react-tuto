import React, { useEffect } from 'react';

// 한 파일에 여러 개 컴포넌트 가능
const User = React.memo(function User({ user, onRemove, onToggle }) {
	console.log('user 렌더링중~');
	// useEffect(() => {
	// 	console.log('user가 마운트되거나 바뀔때마다', user);

	// 	return () => {
	// 		// 클리너 함수라고 한다.
	// 		console.log('user값이 바뀌기 전');
	// 		console.log(user);
	// 	};
	// }, [user]);

	return (
		<div>
			<b
				onClick={() => onToggle(user.id)}
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
			<button onClick={() => onRemove(user.id)} type="button">
				삭제
			</button>
		</div>
	);
});

function UserList({ users, onRemove, onToggle }) {
	console.log('userList 렌더링중~');
	return (
		<div>
			{users.map((user) => (
				<User
					user={user}
					key={user.id}
					onRemove={onRemove}
					onToggle={onToggle}
				/>
			))}
		</div>
	);
}

export default React.memo(UserList, (prev, next) => next.users === prev.users);
