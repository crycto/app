import React from "react";
import formatNumber from "../../../utils/formatNumber";
function Payout({ match }) {
  return (
    <div className="crycto-card--fold _highlight">
      <div className="crycto-card--highlight">
        {match.isBetPlaced() ? (
          <>
            <span className="crycto-card--text-rhs c-gold  f30">
              {formatNumber(+match.getPayout(match.bet?.score))}{" "}
              <small className="payout-x">x</small>
            </span>
            <span className="crycto-card--text-lhs">Your Payout</span>
          </>
        ) : (
          <>
            <span className="crycto-card--text-rhs c-gold  f30">
              {match.getBiggestPayout()} <small className="payout-x">x</small>
            </span>
            <span className="crycto-card--text-lhs">Biggest Payout</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Payout;
