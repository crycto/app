import React, { useEffect, useState } from "react";

import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
    width: "60%",
  },
  colorPrimary: {
    backgroundColor: "var(--c-timer-progress-primary)",
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "var(--c-timer-progress-bar)",
  },
}))(LinearProgress);

function Timer({ match, onDone }) {
  const [timeLeft, setTimeLeft] = useState(match._timeLeft());
  const [progress, setProgress] = useState(100);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done) {
      alert("what");
      return;
    }
    let _id;
    const initial = match.secondsLeft();
    if (match.isTakingBets()) {
      _id = setInterval(
        () => {
          setTimeLeft(match._timeLeft());
          if (match.secondsLeft() <= 0) {
            setDone(true);
            onDone((i) => ++i);
            return;
          }
          // setProgress(parseInt(match.secondsLeft() * 100) / initial);
        },
        initial > 60 * 60 * 24 * 2 ? 60 * 1000 : 1000
      );
    }
    return () => _id && clearInterval(_id);
  }, [match, setTimeLeft, setProgress, done, onDone]);
  return (
    <div className="crycto-card--fold _highlight timer">
      <div className="crycto-card--highlight" style={{ width: "unset" }}>
        <span className="crycto-card--text-rhs c-gold f30">
          {done ? "Locked" : timeLeft}
        </span>

        <span className="crycto-card--text-lhs">Ends In</span>
      </div>
      {/* <BorderLinearProgress
        variant="determinate"
        value={done ? 100 : Math.abs(100 - progress)}
      /> */}
    </div>
  );
}

export default Timer;
