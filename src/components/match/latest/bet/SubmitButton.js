import React from "react";
import Spinner from "../../../utils/Spinner";
import { CircularProgress } from "@material-ui/core";

function SubmitButton({
  account,
  connect,
  valid,
  insufficientBalance,
  onSubmit,
  submitting,
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
      {submitting ? (
        <CircularProgress size={"1.5rem"} color="inherit" />
      ) : (
        <span>{insufficientBalance ? "Insufficient Funds" : "Confirm"}</span>
      )}
    </div>
  );
}

export default SubmitButton;
