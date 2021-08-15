import React from "react";
import { useTournament } from "../../providers/TournamentProvider";
import { useTournamentContract } from "../../providers/WalletProvider";
import formatNumber from "../../utils/formatNumber";

function TournamentStats() {
  const {
    totalRounds = 0,
    totalBets = 0,
    totalAmount = 0,
    rewardAmount = 0,
  } = useTournament();

  return totalBets === 0 ? null : (
    <section class="crycto-stats-section">
      {totalRounds > 0 && <Stat label="Rounds" value={totalRounds} />}
      <Stat label="Bets" value={totalBets} />
      <Stat
        label="Pool"
        value={`${formatNumber(parseFloat(totalAmount).toFixed(1))}`}
      />
      <Stat
        label="Rewards"
        value={`${formatNumber(parseFloat(rewardAmount).toFixed(1))}`}
      />
    </section>
  );
}

const Stat = ({ label, value }) => {
  return (
    <div className="crycto-stats-field">
      <span>{value == 0 ? "0" : value}</span>
      {label && <label>{label}</label>}
    </div>
  );
};

export default TournamentStats;
