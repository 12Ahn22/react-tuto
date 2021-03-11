import React, { createContext, useContext, useState } from 'react';

// 다른 파일에서 작성해도 된다.
const MyContext = createContext('defaultValue');

function Child() {
	const text = useContext(MyContext);
	return <div>안녕하세요 {text}</div>;
}
function Parent({ text }) {
	return <Child text={text} />;
}
function GrandParent({ text }) {
	return <Parent text={text} />;
}
const ContextSample = () => {
	const [value, setValue] = useState(true);
	return (
		<MyContext.Provider value={value ? 'GOOD' : 'BAD'}>
			<GrandParent />
			<button
				type="button"
				onClick={() => {
					setValue(!value);
				}}
			>
				전환
			</button>
		</MyContext.Provider>
	);
};

export default ContextSample;
