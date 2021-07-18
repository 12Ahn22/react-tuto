// 리듀서 함수를 합치는 루트 리듀서
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import sample from './sample';

const rootReducer = combineReducers({
  counter,
  todos,
  sample,
});

export default rootReducer;
