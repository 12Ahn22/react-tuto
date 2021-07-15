// Duck 패턴
// couter 기능에 대한 리덕스 코드가 모두 여기에 작성된다.
// 액션 타입, 액션 타입 생성 함수, 리듀서가 모두 여기에 있다.

// 액션 타입 선언
// '모듈 이름/액션 이름'
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수 만들기
// 액션 생성 함수는 dispatch를 할 때, 사용한다.
// dispatch는 해당 컴포넌트에서 사용한다.
// 따라서 액션 생성 함수는 export를 해
// 외부에서 사용할 수 있도록 해야한다
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기 상태를 만들어준다
const initialState = {
  number: 0,
};

// 리듀서 함수를 만든다. = 상태를 변화시키는 함수
// 리듀서 함수는 순수 함수다.
const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

// 리듀서 함수 내보내기!
export default counter;
