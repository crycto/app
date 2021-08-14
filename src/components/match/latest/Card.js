import React, { useCallback, useState } from "react";
import Header from "./Header";
import BreadCrumbs from "./BreadCrumbs";
import Timer from "./Timer";
import Forfeited from "./Forfeited";
import WinningScore from "./WinningScore";
import Form from "./bet/Form";
import Payout from "./Payout";
import formatNumber from "../../../utils/formatNumber";
import Footer from "./labs/Footer";

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
  if (match.isTakingBets()) {
    return "_predict";
  }
  return "_closed";
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
      className={`crycto-card--blk overflow-hide  ${cls(match)} ${
        showForm && "bet-form"
      }`}
    >
      {!showForm ? (
        <div className="w100 front-screen">
          <BreadCrumbs
            id={matchId}
            uri={match.uri}
            matchDetails={match.matchDetails}
          />
          <div className="crycto-card--blk--visible body-container">
            <Header matchDetails={match.matchDetails} />

            {match.isCompleted() ? (
              <WinningScore score={match.getWinningScoreRange()} />
            ) : match.isForfeited() ? (
              <Forfeited />
            ) : match.isDeadlineCrossed() ? (
              <Payout match={match} />
            ) : (
              <Timer match={match} onDone={setRerender} />
            )}

            <div className="_stats right">
              <Stat label="Bets" value={formatNumber(match.totalBets)} />
              <Stat label="Pool" value={formatNumber(match.totalAmount)} />
            </div>
          </div>
          <Footer match={match} onClickPredict={handlePredict} />
        </div>
      ) : (
        <Form match={match} onClose={setShowForm.bind(null, false)} />
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
      {label && <span className="subtitle">{label}</span>}
    </div>
  );
};

export default Card;
