import React, { useCallback } from "react";
import Icon from "../../../utils/Icon";

function ScoreInput({ minScore, scoreMultiple, value, onChange }) {
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
    <div class="crycto-card--highlight mb20">
      <span class="crycto-card--text-lhs">Score</span>
      <span class="crycto-card--text-rhs mt1rem">
        <Icon name="arrow" className="arrow-left" onClick={decrement} />
        <span class="crycto-score--value">
          {value} - {value + scoreMultiple - 1}
        </span>
        <Icon name="arrow" className="arrow-right" onClick={increment} />
      </span>
    </div>
  );
}

export default ScoreInput;
