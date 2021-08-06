import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import BreadCrumbs from "./BreadCrumbs";
import Timer from "./Timer";
import Forfeited from "./Forfeited";
import WinningScore from "./WinningScore";
import StatusButton from "./StatusButton";

import BetInfo from "./BetInfo";
import Form from "./bet/Form";
import SubmitButton from "./bet/SubmitButton";

const cls = (match) => {
  if (match.isCompleted()) {
    return match.isBetPlaced()
      ? match.isBetWon()
        ? "_win"
        : "_lost"
      : "_completed";
  }
  if (match.isForfeited()) {
    return "_cancelled";
  }
  return "";
};

function Card({ match, ...props }) {
  const submit = useCallback(() => {
    if (match.isBetPlaced()) {
      if (match.isForfeited() && !match.isRefunded()) {
      }
      if (match.isCompleted() && match.isYetToClaim()) {
      }
    }
  }, [match]);
  return (
    <div className={`crycto-card--blk _small ${cls(match)} `} {...props}>
      <div className="crycto-card--blk--visible">
        <Header {...match.matchDetails} />
        {/* <BreadCrumbs id={matchId} {...match.matchDetails} /> */}
        <div className="crycto-card--fold _highlight">
          {match.isCompleted() ? (
            <WinningScore score={match.getWinningScoreRange()} />
          ) : match.isForfeited() ? (
            <Forfeited />
          ) : (
            <Timer match={match} />
          )}
        </div>
        <div className="crycto-card--fold">
          <Stat label="Bets" value={match.totalBets} />
          <Stat label="Pool" value={match.totalAmount} />
          {match.isCompleted() && (
            <>
              <Stat label="Winners" value={match.totalWinners} />
              <Stat label="Rewards" value={match.rewardAmount} />
            </>
          )}
        </div>
        <BetInfo match={match} />
        <StatusButton match={match} onClick={submit} />
      </div>
    </div>
  );
}

const Stat = ({ label, value }) => {
  return (
    <div className="crycto-card--highlight">
      <span className="crycto-card--text-rhs">
        {value == 0 ? "-" : String(value).padStart(2, "0")}
      </span>
      {label && <span className="crycto-card--text-lhs">{label}</span>}
    </div>
  );
};

export default Card;
