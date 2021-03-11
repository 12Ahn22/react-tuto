import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
	console.log('Craete User 렌더링중');
	// console.log('username', username);
	// console.log('email', email);
	return (
		<div>
			<input
				type="text"
				placeholder="id"
				name="username"
				onChange={onChange}
				value={username}
				// value="아이디고정"
			/>
			<input
				type="text"
				placeholder="email"
				name="email"
				onChange={onChange}
				value={email}
			/>
			<button type="button" onClick={onCreate}>
				등록
			</button>
		</div>
	);
};

export default React.memo(CreateUser);
// export default CreateUser;
