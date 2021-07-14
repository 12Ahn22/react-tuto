import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// 컴포넌트 참조
import TodoTemplate from './components/TodoTemplate';

function App() {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
}

export default App;
