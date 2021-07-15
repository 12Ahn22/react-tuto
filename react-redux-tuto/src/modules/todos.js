// todo와 관련된 리덕스

// 액션
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// 액션 생성함수
export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input, // 파라미터를 받는 액션 생성 함수
});

let id = 3; // insert가 호출 될 때마다 1씩 더해지는 변수

export const insert = (text) => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false,
  },
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

// 3. 초기상태 및 리듀서 함수 만들기
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초배우기',
      done: true,
    },
    {
      id: 2,
      text: '리덕스와 리액트 사용하기',
      done: false,
    },
  ],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      console.log('input change');
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      console.log('insert');
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          // 변경할 action.id라면 todo.done을 변경
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case REMOVE:
      return {
        ...state,
        // todo에서 id가 action에서 온 id 인 경우
        // 필터를 통과 못해서 새로운 배열에 들어올 수 없다.
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
};

// 리듀서 함수 내보내기
export default todos;
