import React from 'react';
const BoilingVerdict = ({ temperature, scale }) => {
  if (scale === 'c') {
    if (temperature >= 100) return <p>The Water would boil</p>;
  } else if (scale === 'f') {
  }
  return <p>The Water would not boil</p>;
};

export default React.memo(BoilingVerdict);
