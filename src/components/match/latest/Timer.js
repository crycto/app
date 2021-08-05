import React, { useEffect, useState } from "react";

function Timer({ match }) {
  const [timeLeft, setTimeLeft] = useState(match._timeLeft());
  // useEffect(() => {
  //   let _id;
  //   if (match.isTakingBets() && !match.isBetPlaced()) {
  //     _id = setInterval(
  //       () => {
  //         setTimeLeft(match._timeLeft());
  //       },
  //       match._timeLeft() > 10 * 60 ? 120 * 1000 : 1000
  //     );
  //   }
  //   return () => _id && clearInterval(_id);
  // }, [match]);
  return (
    <div class="crycto-card--highlight">
      <div class="crycto-card--highlight">
        <span class="crycto-card--text-rhs  f30">{timeLeft}</span>
        <span class="crycto-card--text-lhs">Ends In</span>
      </div>
    </div>
  );
}

export default Timer;
