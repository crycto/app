import React, { useCallback, useState } from "react";
import Slider from "../../../utils/Slider";
import { useTournament } from "../../../../providers/TournamentProvider";
import { useWallet } from "../../../../providers/WalletProvider";
import { Input } from "@material-ui/core";

var numberRegex = /^-?\d*\.?\d*$/;

function CryptoInput({ bet, onChange }) {
  const [value, setValue] = useState();
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
    <div className="crycto-card--highlight">
      <span className="crycto-card--text-lhs">Commit</span>
      <span className="crycto-card--text-rhs mt1rem">
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
      <div className="slider-container mt1rem">
        <Slider
          value={parseInt(bet.percentage)}
          onChange={onSlide}
          aria-labelledby="input-slider"
          min={0}
          max={100}
          valueLabelDisplay="off"
          marks={[
            { value: 0, label: "0%" },
            { value: 25, label: "25%" },
            { value: 50, label: "50%" },
            { value: 75, label: "75%" },
            { value: 100, label: "100%" },
          ]}
        />
      </div>
    </div>
  );
}

export default CryptoInput;
