/* eslint-disable no-unused-expressions */
import React, { useCallback, useState } from 'react';
import Calculator from './Calculator';

const CalculatorDiv = () => {
  const [scale, setScale] = useState('c');
  const [temperature, setTemperature] = useState('');

  // Convert Temperature
  const toCelsius = useCallback(() => {
    (fahrenheit) => {
      return ((fahrenheit - 32) * 5) / 9;
    };
  }, []);

  const toFahrenheit = useCallback((celsius) => {
    return (celsius * 9) / 5 + 32;
  }, []);
  const tryConvert = useCallback((temperature, convert) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }, []);
  // scale이 c에 입력이 일어나면 c에는 temperature를 보여줘야함
  //

  // useMemo를 사용해 의존성이 변경 됬을 때만, 다시 계산하려고 했는데
  // 이렇게 쓰면 <BoilingVerdict />컴포넌트가 작동을 안함.
  // const celsius = useMemo(() => {
  //   scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  // }, [temperature]);
  const celsius =
    scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;

  const fahrenheit =
    scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <Calculator
        scale="c"
        temperature={celsius}
        onScaleChange={setScale}
        onTemperatureChange={setTemperature}
      />
      <Calculator
        scale="f"
        temperature={fahrenheit}
        onScaleChange={setScale}
        onTemperatureChange={setTemperature}
      />
    </div>
  );
};

export default CalculatorDiv;
