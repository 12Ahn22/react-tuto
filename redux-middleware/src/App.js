import './App.css';
import Counter from './components/Counter';
import Todo from './components/Todo';

function App() {
  return (
    <div className='App'>
      리덕스 미들웨어
      <Counter number={0} />
      <hr />
      <Todo />
    </div>
  );
}

export default App;
