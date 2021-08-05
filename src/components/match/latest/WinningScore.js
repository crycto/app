import React from "react";

function WinningScore({ score }) {
  return (
    <div className="crycto-card--highlight ">
      <span className="crycto-card--text-rhs  f30">🏅 {score} 🏅</span>
      {/* <span class="crycto-card--text-lhs">Winning Score</span> */}
    </div>
  );
}

export default WinningScore;
