import React from "react";

function BreadCrumbs({ id, uri, date, venue }) {
  return (
    <div className="crycto-card--text">
      <span
        className="crycto-card--labels cp"
        onClick={() => window.open(`https:/ipfs.infura.io/ipfs/${uri}`)}
      >
        #{parseInt(id)}
      </span>
      <span className="crycto-card--labels">{date}</span>
      <span className="crycto-card--labels">{venue}</span>
    </div>
  );
}

export default BreadCrumbs;
