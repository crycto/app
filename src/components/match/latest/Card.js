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
import { Fade } from "@material-ui/core";
import Payout from "./Payout";

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
  if (match.isBetPlaced()) {
    return "_placed";
  }
  return "";
};

function Card({ match }) {
  const matchId = match.id;
  const [showForm, setShowForm] = useState(false);
  const submit = useCallback(() => {
    if (match.isTakingBets() && ~match.isBetPlaced()) {
      setShowForm(true);
    }
    if (match.isBetPlaced()) {
      if (match.isForfeited() && !match.isRefunded()) {
      }
      if (match.isCompleted() && match.isYetToClaim()) {
      }
    }
  }, [match, setShowForm]);
  return (
    <div
      className={`crycto-card--blk overflow-hide ${cls(match)} ${
        showForm && "bet-form"
      }`}
    >
      {/* <Fade in={true}> */}
      <div className="crycto-card--blk--visible">
        <Header matchDetails={match.matchDetails} />
        <BreadCrumbs id={matchId} uri={match.uri} {...match.matchDetails} />
        <div className="crycto-card--fold _highlight">
          {match.isCompleted() ? (
            <WinningScore score={match.getWinningScoreRange()} />
          ) : match.isForfeited() ? (
            <Forfeited />
          ) : match.isDeadlineCrossed() ? (
            <Payout match={match} />
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
        {!showForm && <StatusButton match={match} onClick={submit} />}
      </div>
      {/* </Fade> */}
      {showForm && (
        <>
          <Form match={match} onClose={setShowForm.bind(null, false)} />

          <label
            className="crycto-card--cta"
            onClick={setShowForm.bind(null, false)}
            style={{ zIndex: 99999 }}
          >
            {match.matchDetails.team1}{" "}
            <small style={{ fontSize: ".6rem" }}>vs</small>{" "}
            {match.matchDetails.team2}
          </label>
        </>
      )}
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
