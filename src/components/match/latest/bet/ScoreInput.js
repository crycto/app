import React, { useCallback } from "react";
import Icon from "../../../utils/Icon";

function ScoreInput({
  matchDescription,
  minScore,
  scoreMultiple,
  value,
  onChange,
}) {
  const decrement = useCallback(() => {
    if (value - scoreMultiple < minScore) {
      return;
    }
    onChange(value - scoreMultiple);
  }, [minScore, scoreMultiple, value, onChange]);
  const increment = useCallback(() => {
    onChange(value + scoreMultiple);
  }, [scoreMultiple, value, onChange]);
  return (
    <div className="crycto-card--highlight body-container">
      <p className="crycto-contest--text mb20">{matchDescription}</p>
      <span className="crycto-card--text-rhs ">
        <Icon name="arrow" className="arrow-left" onClick={decrement} />
        <span className="crycto-score--value">
          {value} - {value + scoreMultiple - 1}
        </span>
        <Icon name="arrow" className="arrow-right" onClick={increment} />
      </span>
    </div>
  );
}

export default ScoreInput;
