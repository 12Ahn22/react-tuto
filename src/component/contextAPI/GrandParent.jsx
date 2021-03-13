import React from 'react';
import Parent from './Parent';

const GrandParent = () => {
  return (
    <div>
      <h1>GrandParent</h1>
      <Parent />
    </div>
  );
};

export default GrandParent;
