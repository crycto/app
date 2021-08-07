import React from "react";

function Header({ matchDetails }) {
  return (
    <label className="crycto-card--heading">
      <span>{matchDetails?.team1 ?? "-"}</span>
      <span className="crycto-smallfont">vs</span>
      <span>{matchDetails?.team2 ?? "-"}</span>
      {!isNaN(matchDetails?.period) && matchDetails?.period > 0 && (
        <label>{matchDetails.getPeriodText()}</label>
      )}
    </label>
  );
}

export default Header;
