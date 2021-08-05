import React from "react";
import Icon from "../../utils/Icon";

function BetInfo({ match }) {
  return (
    <div class="crycto-card--maincontent">
      <div class="crycto-card--maincontent-blk">
        <span class="crycto-card--maincontent-lhs">
          <Icon name="bat" className="small-icons" />
        </span>
        <span class="crycto-card--maincontent-rhs crycto-color--purple">
          {match.getPlacedBetScoreRange() ?? "-"}
        </span>
      </div>
      <div class="crycto-card--maincontent-blk">
        <span class="crycto-card--maincontent-lhs">
          <Icon name="moneybag" className="small-icons" />
        </span>
        <span class="crycto-card--maincontent-rhs">
          {match.getPlacedBetAmount()
            ? `${match.getPlacedBetAmount()} MATIC`
            : "-"}
        </span>
      </div>
    </div>
  );
}

export default BetInfo;
