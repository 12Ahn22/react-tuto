// 스토어를 만들기 위한 createStore 함수 가져오기
import { createStore } from 'redux';

// console.log('Hi parcel');
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// 1. 액션 이름 선언하기
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 이름으로 액션 객체를 만드는 액션 함수 선언하기
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// 2. 프로젝트에서 사용할 초기값 설정하기
const initialState = {
  toggle: false,
  counter: 0,
};

// 3. state와 action을 파라미터로 받는 리듀서 함수를 선언한다
// 리듀서 함수는 상태를 업데이트한다.
const reducer = (state = initialState, action) => {
  // action.type에 따라 다른 작업을 처리한다.
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지 -> 변화를 감지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

// 4. 스토어를 만들어준다.
const store = createStore(reducer);

// 5. 렌더 함수 만들기
// 상태가 업데이트 될 때마다 호출된다.
const render = () => {
  // store에 있는 내장 메서드로 현재 상태를 불러온다.
  const state = store.getState();
  // 토글 처리하기
  if (state.toggle) {
    // 만약 토글이 true이면
    // divToggle DOM 요소에 active라는 클래스를 추가해 준다.
    divToggle.classList.add('active');
  } else {
    // 아니라면 삭제
    divToggle.classList.remove('active');
  }
  // 카운터 처리하기
  counter.innerText = state.counter;
};

// 6. 구독해주기
const listener = () => {
  console.log('상태가 업데이트 되었습니다');
};
const unsubscribe = store.subscribe(listener); // 구독 비활성화 함수

render();
store.subscribe(render); // 구독해주기

// 액션 발생 시키기
divToggle.onclick = () => {
  // toggleSwitch()는 토글 액션을 생성하는 액션 생성함수
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  // increase(difference)는 increase 액션을 생성하는 액션 생성 함수
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
