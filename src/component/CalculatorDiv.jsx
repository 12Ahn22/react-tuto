import React, { useState } from 'react';
import Calculator from './Calculator';

const CalculatorDiv = () => {
  const [scale, setScale] = useState('c');
  const [temperature, setTemperature] = useState('');

  // scale이 c에 입력이 일어나면 c에는 temperature를 보여줘야함
  //
  const celsius =
    scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit =
    scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  // Convert Temperature
  function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }
  function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }
  function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

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
