import React from "react";

function SubmitButton({
  account,
  connect,
  valid,
  insufficientBalance,
  onSubmit,
}) {
  return !account ? (
    <div className="action-button" onClick={connect}>
      <span>Connect</span>
    </div>
  ) : (
    <div
      className={`action-button ${!valid && "_disabled"}`}
      onClick={onSubmit}
    >
      <span>{insufficientBalance ? "Insufficient Balance" : "Confirm"}</span>
    </div>
  );
}

export default SubmitButton;
