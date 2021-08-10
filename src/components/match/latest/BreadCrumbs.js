import React from "react";

function BreadCrumbs({ id, uri, matchDetails }) {
  return (
    <div className="crycto-card--text">
      <span
        className="crycto-card--labels cp"
        onClick={() => window.open(`https://ipfs.infura.io/ipfs/${uri}`)}
      >
        #{parseInt(id)}
      </span>
      <span className="crycto-card--labels">{matchDetails.date ?? "-"}</span>
      <span className="crycto-card--labels">
        {matchDetails.getPeriodText() ?? "-"}
      </span>
      {/* {!isNaN(matchDetails?.period) && matchDetails?.period > 0 && (
        <label>{matchDetails.getPeriodText()}</label>
      )} */}
    </div>
  );
}

export default BreadCrumbs;
