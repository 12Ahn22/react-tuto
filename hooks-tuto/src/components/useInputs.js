import { useReducer } from 'react';

// 커스텀 훅스 만들기

// useReducer에 사용할 리듀서 함수
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  // state와 onChange 이벤트 처리 메서드를 반환
  return [state, onChange];
}
