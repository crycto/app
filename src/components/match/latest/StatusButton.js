import React from "react";

function StatusButton({ match, onClick }) {
  if (match.isForfeited()) {
    if (match.isRefunded()) {
      return <label className="crycto-card--cta cta-disabled">Refunded</label>;
    } else if (match.isBetPlaced()) {
      return (
        <label className="crycto-card--cta" onClick={onClick}>
          Refund
        </label>
      );
    }
    return <label className="crycto-card--cta cta-disabled">Forfeited</label>;
  }
  if (match.isCompleted()) {
    if (match.isBetWon()) {
      if (match.isYetToClaim()) {
        return (
          <label className="crycto-card--cta" onClick={onClick}>
            Claim
          </label>
        );
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
    return <label className="crycto-card--cta cta-disable">Placed</label>;
  }
  if (match.isTakingBets()) {
    return (
      <label className="crycto-card--cta" onClick={onClick}>
        Predict
      </label>
    );
  }

  return null;
}

export default StatusButton;
