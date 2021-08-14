import React from "react";
import ClaimRefundButton from "../ClaimRefundButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import LockIcon from "@material-ui/icons/Lock";

function ActionButton({ match, onClickPredict }) {
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
    return (
      <div className="action-button">
        <span>
          <ThumbUpIcon /> Placed
        </span>
      </div>
    );
  }
  if (match.isTakingBets()) {
    return (
      <div className="action-button">
        <span onClick={onClickPredict}>Predict</span>
      </div>
    );
  }

  return (
    <div className="action-button">
      <span>
        <LockIcon />
        Bets Closed
      </span>
    </div>
  );
}

export default ActionButton;
