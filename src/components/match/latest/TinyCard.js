import React from "react";
import Header from "./Header";
import Timer from "./Timer";
import Forfeited from "./Forfeited";
import WinningScore from "./WinningScore";
import Status from "./StatusButton";
import BetInfo from "./BetInfo";
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
  return "";
};

function Card({ match, ...props }) {
  return (
    <div className={`crycto-card--blk _small ${cls(match)} `} {...props}>
      <div className="crycto-card--blk--visible">
        <Header matchDetails={match.matchDetails} />
        {/* <BreadCrumbs id={matchId} {...match.matchDetails} /> */}

        {match.isCompleted() ? (
          <WinningScore score={match.getWinningScoreRange()} />
        ) : match.isForfeited() ? (
          <Forfeited />
        ) : (
          <Timer match={match} />
        )}

        <div className="crycto-card--fold _stats">
          <Stat label="Bets" value={formatNumber(match.totalBets)} />
          <Stat label="Pool" value={formatNumber(match.totalAmount)} />
          {match.isCompleted() && (
            <>
              <Stat label="Winners" value={formatNumber(match.totalWinners)} />
              <Stat label="Payout" value={`${+match.getWinningPayout()}x`} />
            </>
          )}
        </div>
        <BetInfo match={match} />
        <Status match={match} />
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
