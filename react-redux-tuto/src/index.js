import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// provider
import { Provider } from 'react-redux';

// 스토어 만들기
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';

// 미들웨어 적용하기
import loggerMiddleware from './lib/loggerMiddleware';

// 리덕스 thunk 사용해보기
import ReduxThunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  // log를 찍는 미들웨어와 리덕스 thunk 미들웨어 사용하기
  applyMiddleware(loggerMiddleware, ReduxThunk) // 미들웨어 적용하기
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
