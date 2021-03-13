import React, { useState } from 'react';
import BoilingVerdict from './BoilingVerdict';

const Calculator = ({
  scale,
  temperature,
  onScaleChange,
  onTemperatureChange,
}) => {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
  };
  const handleChanged = (e) => {
    onTemperatureChange(e.target.value);
    onScaleChange(scale);
    // console.log(scale);
  };
  return (
    <fieldset>
      <legend>
        Enter temperature in <b>{scaleNames[scale]}</b>
      </legend>
      <input
        type="text"
        value={temperature}
        onChange={handleChanged}
        placeholder="temperature"
      />
      <BoilingVerdict celsius={temperature} />
    </fieldset>
  );
};

export default Calculator;
