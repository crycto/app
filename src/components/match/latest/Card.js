import React, { useCallback, useState } from "react";
import Header from "./Header";
import BreadCrumbs from "./BreadCrumbs";
import Timer from "./Timer";
import Forfeited from "./Forfeited";
import WinningScore from "./WinningScore";
import StatusButton from "./StatusButton";
import BetInfo from "./BetInfo";
import Form from "./bet/Form";
import Payout from "./Payout";
import formatNumber from "../../../utils/formatNumber";

const cls = (match) => {
  if (match.isCompleted()) {
    return match.isBetPlaced()
      ? match.isBetWon()
        ? "_win"
        : "_lost"
      : "_completed";
  }
  if (match.isForfeited()) {
    return `_cancelled ${
      match.isBetPlaced() && !match.isRefunded() && "_refund"
    }`;
  }
  if (match.isBetPlaced()) {
    return "_placed";
  }
  return "";
};

function Card({ match }) {
  const matchId = match.id;
  const [showForm, setShowForm] = useState(false);
  const [reRender, setRerender] = useState(0);

  const handlePredict = useCallback(() => {
    if (match.isTakingBets() && !match.isBetPlaced()) {
      setShowForm(true);
    }
  }, [match, setShowForm]);
  return (
    <div
      className={`crycto-card--blk overflow-hide ${cls(match)} ${
        showForm && "bet-form"
      }`}
    >
      <div className="crycto-card--blk--visible">
        <Header matchDetails={match.matchDetails} />
        <BreadCrumbs
          id={matchId}
          uri={match.uri}
          matchDetails={match.matchDetails}
        />
        {match.isCompleted() ? (
          <WinningScore score={match.getWinningScoreRange()} />
        ) : match.isForfeited() ? (
          <Forfeited />
        ) : match.isDeadlineCrossed() ? (
          <Payout match={match} />
        ) : (
          <Timer match={match} onDone={setRerender} />
        )}

        <div className="crycto-card--fold _stats">
          <Stat label="Bets" value={formatNumber(match.totalBets)} />
          <Stat label="Pool" value={formatNumber(match.totalAmount)} />
          {match.isCompleted() && (
            <>
              <Stat label="Winners" value={formatNumber(match.totalWinners)} />
              <Stat label="Payout" value={`${match.getWinningPayout()}x`} />
            </>
          )}
        </div>
        <BetInfo match={match} />
        {!showForm && (
          <StatusButton match={match} onClickPredict={handlePredict} />
        )}
      </div>

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
            {match.matchDetails.period > 0 &&
              ` - ${match.matchDetails.getPeriodText()}`}
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
        {value == 0 ? "0" : String(value).padStart(2, "0")}
      </span>
      {label && <span className="crycto-card--text-lhs">{label}</span>}
    </div>
  );
};

export default Card;
