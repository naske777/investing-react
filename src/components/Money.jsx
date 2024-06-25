import React from 'react';

function Money({ mlc, usd, cup }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>MLC: {mlc}</div>
      <div>USD: {usd}</div>
      <div>CUP: {cup}</div>
    </div>
  );
}

export default Money;