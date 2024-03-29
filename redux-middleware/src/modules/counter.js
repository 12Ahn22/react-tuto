// 액션 타입
const INCREASE = 'counter/INCREASE';
const DECRESE = 'counter/DECREASE';

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECRESE });

// 초기화
const initialState = {
  number: 0,
};

// 리듀서 함수
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECRESE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}

export default counter;
