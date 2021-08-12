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

      <div>
        <span>{matchDetails.date ?? "-"}</span>
      </div>
      <div>
        <span>{matchDetails.venue ?? "-"}</span>
      </div>
    </div>
  );
}

export default BreadCrumbs;
