import React, { useCallback, useMemo, useRef, useState } from 'react';
// useMemo를 위한 Average 컴포넌트

const getAvg = (numbers) => {
  console.log('평균값 계산하기!');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, value) => acc + value);
  return sum / numbers.length;
};

// 함수형 컴포넌트 Average
export default function Average() {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  // useRef 사용해서 ref 다루기
  const inputEl = useRef(null);

  // useCallback을 사용해 처음 렌더링될 때만 함수 생성
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);
  // useCallback을 사용해 혹시 list와 number props가 변경됬다면
  // 함수 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
    inputEl.current.focus();
  }, [number, list]);

  // useMemo로 getAvg가 input태그가 변경될 때는 실행되지 않도록하기
  // = 평균값이 바뀌지않으면 실행되지 않도록하기
  const avg = useMemo(() => getAvg(list), [list]);
  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      {
        // 등록을 했을 때만, getAvg가 실행되길 원하지만
        // input 태그에 입력을 할 때도 계속 실행된다.. => useMemo로 처리가능
        // useMemo를 사용 avg
      }
      <h3>평균값 :{avg}</h3>
    </div>
  );
}
