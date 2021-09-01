import React from "react";

function BreadCrumbs({ id, uri, matchDetails }) {
  return (
    <div className="crycto-card-top-container">
      <div>
        <span
          className="cp"
          onClick={() => window.open(`https://ipfs.infura.io/ipfs/${uri}`)}
        >
          #{parseInt(id)}
        </span>
      </div>
      {matchDetails.series && (
        <div title={matchDetails.series}>
          <span>{matchDetails.series}</span>
        </div>
      )}
      {matchDetails.subtitle && (
        <div title={matchDetails.subtitle}>
          <span>{matchDetails.subtitle}</span>
        </div>
      )}
      <div title={matchDetails.date}>
        <span>{matchDetails.date ?? "-"}</span>
      </div>
      <div title={matchDetails.venue}>
        <span>{matchDetails.venue ?? "-"}</span>
      </div>
    </div>
  );
}

export default BreadCrumbs;
