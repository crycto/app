import React from "react";
import BetInfo from "../BetInfo";
import ActionButton from "./ActionButton";

function Footer({ match, onClickPredict }) {
  return (
    <div className="crycto-card--maincontent bottom-container">
      {match.isBetPlaced() && <BetInfo match={match} />}
      <ActionButton match={match} onClickPredict={onClickPredict} />
    </div>
  );
}

export default Footer;
