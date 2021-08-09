import React from "react";
import Icon from "../../utils/Icon";

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
    <div className="crycto-card--maincontent">
      <div className="crycto-card--maincontent-blk">
        <span className="crycto-card--maincontent-lhs">
          <Icon name="bat" className="small-icons" />
        </span>
        <span className="crycto-card--maincontent-rhs crycto-color--purple">
          {match.getPlacedBetScoreRange() ?? "-"}
        </span>
      </div>
      <div className="crycto-card--maincontent-blk">
        <span className="crycto-card--maincontent-lhs">
          <Icon name="moneybag" className="small-icons" />
        </span>
        <span className="crycto-card--maincontent-rhs">
          {match.getPlacedBetAmount()
            ? `${match.getPlacedBetAmount()} MATIC`
            : "-"}
        </span>
      </div>
    </div>
  );
}

export default BetInfo;
