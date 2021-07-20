// 인증을 위한 리덕스 모듈
// 리덕스는 Ducks 패턴을 사용한다

// 1. 액션 & 액션 생성함수를 만든다
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';

export const changeFiled = (form, key, value) => ({
  type: CHANGE_FIELD,
  payload: {
    form, // register냐 login 이냐
    key, // username, password, passwordConform
    value, // 바꾸려는 값
  },
});
export const initializeForm = (form) => ({
  type: INITIALIZE_FORM,
  payload: {
    form,
  },
});

export const authResult = (msg, status) => ({
  type: AUTH_SUCCESS,
  payload: {
    msg,
    status,
  },
});

// 2. 초기 state값을 설정한다.
const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: {
    msg: '',
    status: '',
  },
};

// 3. 리듀서 함수를 만든다
const auth = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      // console.log('지금액션에 뭐가있니', action.payload);
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.key]: action.payload.value,
        },
      };
    case INITIALIZE_FORM:
      return {
        ...state,
        [action.payload.form]: initialState[action.payload.form],
      };
    // 로그인 & 회원가입 성공 여부
    case AUTH_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          [action.payload.msg]: action.payload.msg,
          [action.payload.status]: action.payload.status,
        },
      };

    default:
      return state;
  }
};

export default auth;
