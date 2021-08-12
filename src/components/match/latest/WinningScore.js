import React from "react";

function WinningScore({ score }) {
  return (
    <div className="crycto-card--fold center">
      <div className="crycto-card--highlight ">
        <span className="crycto-card--text-rhs  f30">🏅 {score} 🏅</span>
        {/* <span className="crycto-card--text-lhs">Winning Score</span> */}
      </div>
    </div>
  );
}

export default WinningScore;
