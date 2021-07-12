import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import Info from './components/Info';
import Average from './components/Average';

function App() {
  return (
    <div className='App'>
      <Counter></Counter>
      <Info></Info>
      <Average></Average>
    </div>
  );
}

export default App;
