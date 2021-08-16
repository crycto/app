import React from "react";

function EarlySupport() {
  return (
    <section className="crycto-early-section">
      <span className="crycto-early-section-content">
        Show us your early support and get a chance to win <b>5 MATIC</b> to get
        you started with once we go live
      </span>

      <input
        className="crycto-early-section-input"
        type="text"
        placeholder="Paste your wallet address here..."
        spellcheck="false"
      />

      <div className="crycto-early-section-submit">Submit</div>
    </section>
  );
}

export default EarlySupport;
