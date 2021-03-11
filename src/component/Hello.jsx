import React from 'react';

const Hello = ({ name, isTrue }) => {
	return (
		<>
			{isTrue && <h1>True 입니다</h1>}
			// {false ? <h1>True 입니다</h1> : <h1>False 입니다</h1>}
			<div>안녕하세요 {name}</div>
		</>
	);
};

Hello.defaultProps = {
	name: '이름없음',
};
export default Hello;
