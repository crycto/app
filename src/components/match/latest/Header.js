import React from "react";

function Header({ team1, team2 }) {
  return (
    <label className="crycto-card--heading">
      <span>{team1}</span>
      <span className="crycto-smallfont">vs</span>
      <span>{team2}</span>
    </label>
  );
}

export default Header;
