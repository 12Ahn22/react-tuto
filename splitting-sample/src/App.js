import logo from './logo.svg';
import './App.css';
import React, { useState, Suspense } from 'react';

const SplitMe = React.lazy(() => import('./SplitMe'));

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  // const onClick = () => {
  //   // import를 함수로 사용하면 Promise를 반환한다.
  //   // 바닐라 자바스크립트가 아닌 stage-3단계에 있는
  //   // dynamic import라는 문법이다. - 웹팩에서 지원
  //   // 이 함수를 통해 모듈을 불러올 때, 모듈에서 default로 내보낸 것은
  //   // result.default를 참조해야 사용할 수 있다.
  //   import('./notify').then((result) => result.default());
  // };
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p onClick={onClick}>헬로 월드으으</p>
        <Suspense fallback={<div>loading....</div>}>
          {visible && <SplitMe />}
        </Suspense>
      </header>
    </div>
  );
}

export default App;
