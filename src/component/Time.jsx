import React, { useEffect, useState } from 'react';

const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // 시간을 업데이트하는 함수 tick
  const tick = () => {
    setTime(new Date().toLocaleTimeString());
  };

  //
  useEffect(() => {
    setInterval(tick, 1000);
    return clearInterval(tick);
  }, [time]);

  return (
    <div>
      <h2>현재시간 :{time}</h2>
    </div>
  );
};

export default Time;
