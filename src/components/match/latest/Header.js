import React from "react";

function Header({ matchDetails }) {
  return (
    <div class="left">
      <label className="crycto-card--heading">
        <span>{matchDetails?.team1 ?? "-"}</span>
        <span className="crycto-smallfont">vs</span>
        <span>{matchDetails?.team2 ?? "-"}</span>
      </label>
      <span className="subtitle">{matchDetails.getPeriodText() ?? "-"}</span>
    </div>
  );
}

export default Header;
