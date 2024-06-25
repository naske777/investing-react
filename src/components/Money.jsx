import React from "react";

function Money({ mlc, usd, cup }) {
  return (
    <div className="d-flex-evenly money-content mb-4">
      <div className="money">
        MLC: <strong> {mlc} </strong>
      </div>
      <div className="money">
        USD: <strong>{usd} </strong>
      </div>
      <div className="money">
        CUP: <strong>{cup} </strong>
      </div>
    </div>
  );
}

export default Money;
