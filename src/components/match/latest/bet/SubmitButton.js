import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  button: {
    background: "var(--c-blue)",
    color: "white",
    fontFamily: "var(--crycto-font-montserrat)",
    fontSize: "1.2rem",
    padding: "1rem 2rem",
    borderRadius: 5,
    margin: "1rem auto",
    boxShadow: "1px 6px 20px -15px var(--c-blue)",
    "&:hover": {
      backgroundColor: "var(--c-blue)",
      opacity: 0.95,
    },
    "&:disabled": {
      pointerEvents: "none",
      opacity: 0.6,
      boxShadow: "none",
      color: "white",
    },
  },
});

function SubmitButton({
  account,
  connect,
  valid,
  insufficientBalance,
  onSubmit,
}) {
  const classes = useStyles();

  return !account ? (
    <Button onClick={connect} className={classes.button}>
      Connect
    </Button>
  ) : (
    <Button disabled={!valid} onClick={onSubmit} className={classes.button}>
      {insufficientBalance ? "Insufficient Balance" : "Confirm"}
    </Button>
  );
}

export default SubmitButton;
