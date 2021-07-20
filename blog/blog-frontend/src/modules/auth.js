// 인증을 위한 리덕스 모듈
// 리덕스는 Ducks 패턴을 사용한다

// 1. 액션 & 액션 생성함수를 만든다
const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

export const sampleAction = () => ({ type: SAMPLE_ACTION });

// 2. 초기 state값을 설정한다.
const initialState = {};

// 3. 리듀서 함수를 만든다
const auth = (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE_ACTION:
      return state;
    default:
      return state;
  }
};

export default auth;
