import React, { useContext } from 'react';
import ContextText from './Context';
const Child = () => {
  const text = useContext(ContextText);
  return (
    <div>
      <h3>Child</h3>
      <p>text : {text}</p>
    </div>
  );
};

export default Child;
