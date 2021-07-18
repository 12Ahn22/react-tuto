// 실제로 리덕스 스토어에 접근하여
// 원하는 상태를 가져오고 액션을 디스패치 하는 컴포넌트들

import React, { useCallback } from 'react';
import Counter from '../components/Counter';
// 훅스로 연결하기
import { connect, useSelector, useDispatch } from 'react-redux';

// 액션 생성함수가 너무 많아서 코드가 더러워질 때 사용한다
import { bindActionCreators } from 'redux';
// 액션 객체 생성 함수 불러오기
import { increase, decrease } from '../modules/counter';
// 비동기 액션 객체 생성 함수 불러오기
import { increaseAsync, decreaseAsync } from '../modules/counter';

// const CounterContainer = ({ number, increase, decrease }) => {
// return (
//   // Store에서 가져온 상태들을 props로 보내주기
//   <Counter number={number} onIncrease={increase} onDecrease={decrease} />
// );
// };

const CounterContainer = ({ increaseAsync, decreaseAsync }) => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  // useCallback()으로 이벤터 처리기 함수가 계속
  // 재 생성되지않도록 하기
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    // Store에서 가져온 상태들을 props로 보내주기
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

// 아래 코드는 connect에서 익명 함수로 사용가능
// state에 있는 상태를 가져온다.
const mapStateToProps = (state) => ({
  // state는 현재 store가 가지고 있는 상태를 말한다.
  // counter를 내보낼 때 counter로 내보내기 때문에
  // counter 상태는 state.counter에 있다.
  number: state.counter.number,
});

// dispatch를 위한 함수
const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    // 액션 객체 생성함수를 참조해 가져와서 여기서 사용한다.
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

// 익명 함수로 사용 가능
// export default connect(
//   (state) => ({ number: state.counter.number }),
//   // 단, dispatch가 너무 늘어나면 코드가 지저분해진다..
//   // 그래서 bindActionCreators 유틸 함수를 사용한다.
//   (dispatch) => ({
//     increase: () => dispatch(increase()),
//     decrease: () => dispatch(decrease()),
//   })
// )(CounterContainer);

// export default connect(
//   (state) => ({ number: state.counter.number }),
//   // 단, dispatch가 너무 늘어나면 코드가 지저분해진다..
//   // 그래서 bindActionCreators 유틸 함수를 사용한다.
//   (dispatch) =>
//     bindActionCreators(
//       {
//         increase,
//         decrease,
//       },
//       dispatch
//     )
// )(CounterContainer);

// 더 쉬운 방법...
export default connect(
  (state) => ({ number: state.counter.number }),
  // 아예 파라미터를 객체로 전달하면
  // connect가 알아서 bindActionCreator를 해준다.
  {
    increaseAsync,
    decreaseAsync,
  }
)(CounterContainer);

// export default CounterContainer;
