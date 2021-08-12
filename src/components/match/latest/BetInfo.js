import React from "react";
import formatNumber from "../../../utils/formatNumber";
import Icon from "../../utils/Icon";
import ActionButton from "./labs/ActionButton";

function BetInfo({ match }) {
  if (!match.isBetPlaced() && (match.isCompleted() || match.isForfeited())) {
    return (
      <div className="crycto-card--maincontent">
        <div className="crycto-card--maincontent-blk">
          <span className="crycto-card--maincontent-rhs w100">-</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="crycto-card--maincontent-blk">
        <Icon name="bat" className="small-icons" />

        <span className="user-value">
          {match.getPlacedBetScoreRange() ?? "-"}
        </span>
      </div>
      <div className="crycto-card--maincontent-blk">
        <Icon name="moneybag" className="small-icons" />

        <span className="user-value">
          {formatNumber(match.getPlacedBetAmount())} MATIC
        </span>
      </div>
      <div className="crycto-card--maincontent-blk">
        <Icon name="trophy" className="small-icons" />
        <span className="user-value">{match.getPayout(match.bet?.score)}x</span>
      </div>
    </>
  );
}

export default BetInfo;
