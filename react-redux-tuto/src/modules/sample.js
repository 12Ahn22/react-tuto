import { handleActions } from 'redux-actions';

// api파일 모듈들을 api 객체로 가져오기
import * as api from '../lib/api';

// 액션 타입 만들기
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_SUCCESS';

// 초기 상태 선언
const initialState = {
  // 요청 로딩중 상태는 loading이라는 객체에서 관리
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};

// thunk 함수 생성하기
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때
// 다른 액션을 디스패치 한다.
export const getPost = (id) => async (dispatch) => {
  // 시작 할 때,
  dispatch({ type: GET_POST });

  try {
    // 성공했나요?
    const response = await api.getPost(id); // axios로 데이터 가져오기

    // 성공했을 경우 성공 액션 객체 함수 사용
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

// 리듀서???
const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true,
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, // 요청 완료
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true, // 요청시작
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
    }),
  },
  initialState
);

export default sample;
