import React from "react";

function SubmitButton({ account, connect, valid, onSubmit }) {
  return !account ? (
    <button onClick={connect} className="crycto-card--web3-button">
      Connect
    </button>
  ) : (
    <button
      disabled={!valid}
      onClick={onSubmit}
      className="crycto-card--web3-button"
    >
      Confirm
    </button>
  );
}

export default SubmitButton;
