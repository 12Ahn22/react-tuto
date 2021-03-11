import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
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

export default CreateUser;
