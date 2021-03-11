import logo from './logo.svg';
import './App.css';
import Hello from './component/Hello';
import Wrapper from './component/Wrapper';
import Counter from './component/Counter';
import Input from './component/input';
import UserList from './component/userlist';

function App() {
	const name = 'react';
	const style = {
		backgroundColor: 'black',
		color: 'aqua',
		fontSize: 24,
		padding: '1rem',
	};
	return (
		<Wrapper>
			<UserList />
		</Wrapper>
	);
}

export default App;
