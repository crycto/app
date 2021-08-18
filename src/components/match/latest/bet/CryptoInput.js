import React, { useCallback } from "react";
import isMobileBrowser from "../../../../utils/isMobileBrowser";
import Slider from "../../../utils/Slider";

const numberRegex = /^-?\d*\.?\d*$/;

const marks = isMobileBrowser()
  ? [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]
  : [
      { value: 0, label: "0%" },
      { value: 25, label: "25%" },
      { value: 50, label: "50%" },
      { value: 75, label: "75%" },
      { value: 100, label: "Max" },
    ];

function CryptoInput({ bet, onChange }) {
  const onInput = useCallback(
    (e) => {
      numberRegex.test(e.target.value) &&
        onChange({ rawInput: e.target.value });
    },
    [onChange]
  );
  const onSlide = useCallback(
    (_, percentage) => {
      onChange({ percentage });
    },
    [onChange]
  );
  return (
    <div className="crycto-card--highlight crypto-slider">
      <div className="slider-container crypto-input">
        <Slider
          value={parseInt(bet.percentage)}
          onChange={onSlide}
          aria-labelledby="input-slider"
          min={0}
          max={100}
          valueLabelDisplay="off"
          marks={marks}
        />
      </div>
      <span className="crycto-card--text-rhs">
        <input
          step={10}
          min={0}
          max={100}
          className="range-value mr10"
          value={bet.rawInput}
          onChange={onInput}
          aria-labelledby="input-slider"
        />
        <span className="f20">Matic</span>
      </span>
    </div>
  );
}

export default CryptoInput;
