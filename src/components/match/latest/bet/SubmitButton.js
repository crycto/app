import React from "react";
import Spinner from "../../../utils/Spinner";

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
      <span>{insufficientBalance ? "Insufficient Funds" : "Confirm"}</span>
    </div>
  );
}

export default SubmitButton;
