import React from "react";
import ClaimRefundButton from "./ClaimRefundButton";

function StatusButton({ match, onClickPredict }) {
  if (match.isForfeited()) {
    if (match.isRefunded()) {
      return <label className="crycto-card--cta cta-disabled">Refunded</label>;
    } else if (match.isBetPlaced()) {
      return <ClaimRefundButton match={match} refund={true} />;
    }
    return <label className="crycto-card--cta cta-disabled">Forfeited</label>;
  }
  if (match.isCompleted()) {
    if (match.isBetWon()) {
      if (match.isYetToClaim()) {
        return <ClaimRefundButton match={match} />;
      }
      if (match.isClaimed()) {
        return <label className="crycto-card--cta cta-disabled">Claimed</label>;
      }
    } else if (match.isBetPlaced()) {
      return <label className="crycto-card--cta cta-disabled">Lost</label>;
    }
    return <label className="crycto-card--cta cta-disabled">Completed</label>;
  }
  if (match.isBetPlaced()) {
    return <label className="crycto-card--cta cta-disabled">Placed</label>;
  }
  if (match.isTakingBets()) {
    return (
      <label
        className="crycto-card--cta f-drop-shadow"
        onClick={onClickPredict}
      >
        Predict
      </label>
    );
  }

  return <label className="crycto-card--cta cta-disabled">Bets Closed</label>;
}

export default StatusButton;
