import { useState, useRef, useCallback } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// 컴포넌트 참조
import TodoTemplate from './components/TodoTemplate';

function App() {
  // 더미 데이터
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 하기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들기',
      checked: false,
    },
  ]);

  // 고유 id 값으로 사용될 id를
  // useRef로 만들어서 사용한다 = 로컬 변수
  // 로컬변수는 렌더링과 상관없는 값이다.
  const nextId = useRef(4);

  // todo를 저장하는 이벤트 처리기 함수= props로 사용할 TodoInsert에 전달된다
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current, // useRef의 값은 current에 있다.
        text,
        checked: false,
      };
      setTodos(todos.concat(todo)); // concat은 새로운 배열을 반환한다.
      nextId.current += 1; // id 값 +1
    },
    [todos],
  );

  // remove 이벤트 처리기
  const onRemove = useCallback(
    // id값을 받아서 해당 id면 필터의 조건에서 false
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  // toggle 이벤트
  const onToggle = useCallback((id) => {
    // id에 맞는 todo 객체를 찾아서
    // 그 객체를 ... 스프레드 연산자로 전부 복사 한 후에
    // checked값을 반전시킨다.
    setTodos(
      // map을 사용해 특정 배열 원소를 업데이트 할 수 있다.
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  });
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      {/* props로 todos 데이터를 넘겨준다 */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
