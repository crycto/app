import {
  Modal,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import localStorage from "../../localstorage";
import Icon from "./Icon";
import { Fade } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 6,
    width: 24,
    height: 24,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#edf1ff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      borderRadius: 20,
      outlineOffset: 2,
    },
    margin: 3,
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    borderRadius: 6,
    margin: 3,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
    backgroundColor: "var(--c-blue)",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 24,
      height: 24,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    // "input:hover ~ &": {
    //   backgroundColor: "#106ba3",
    // },
  },
  button: {
    "&:hover": {
      filter: "brightness(.95)",
    },
    "&:disabled": {
      background: "lightgray!important",
      pointerEvents: "auto",
      cursor: "not-allowed",
    },
  },
});

// Inspired by blueprintjs
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={classes.checkedIcon} />}
      icon={<span className={classes.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      {...props}
    />
  );
}

function StylizedButton({ children, ...props }) {
  const classes = useStyles();
  return (
    <Button className={classes.button} {...props}>
      {children}
    </Button>
  );
}

function Consent() {
  const [open, setOpen] = useState(false);
  const [acceptedTerm1, setAcceptedTerm1] = useState(false);
  const [acceptedTerm2, setAcceptedTerm2] = useState(false);
  const [acceptedTerm3, setAcceptedTerm3] = useState(false);

  useEffect(() => {
    setOpen(localStorage.get("crycto_v1_accepted_risk") !== "true");
  }, []);
  const onContinue = useCallback(() => {
    if (acceptedTerm1 && acceptedTerm2) {
      localStorage.set("crycto_v1_accepted_risk", true);
      setOpen(false);
    }
  }, [acceptedTerm1, acceptedTerm2]);
  if (!open) {
    return null;
  }
  return (
    <Modal
      open={true}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.9)" } }}
    >
      <Fade in={true} style={{ transitionDelay: "500ms" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            width: "25%",
            minWidth: 300,
            height: "fit-content",
            outline: "none",
            color: "black",
            fontSize: "1.8rem",
            overflow: "hidden",
            borderRadius: 10,
            fontFamily: "Montserrat-Regular",
            filter: "drop-shadow(2px 4px 20px rgba(0,0,0,0.3))",
          }}
        >
          {/* <div
          style={{
            background: "var(--c-blue)",
            width: "100%",
            color: "white",
            fontWeight: "bolder",
            padding: "1rem 2rem",
            fontSize: "2.5rem",
          }}
        >
          Welcome 🏏
        </div> */}
          <div style={{ padding: "2.5rem 2rem", background: "white" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon name="logo" className="w30" />
              <h1
                style={{
                  color: "black",
                  fontWeight: "bolder",
                  fontSize: "2.5rem",
                  marginLeft: "1rem",
                }}
              >
                Crycto is in beta.
              </h1>
            </div>
            <h3
              style={{
                marginTop: "5%",
                fontSize: "1.5rem",
                opacity: 0.7,
                color: "hsl(0deg 0% 34%)",
                fontWeight: "bold",
              }}
            >
              {" "}
              Once you enter a position, you cannot cancel or adjust it.
            </h3>
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={acceptedTerm1}
                  onChange={() => setAcceptedTerm1((val) => !val)}
                  name="checkedA"
                  color="primary"
                />
              }
              style={{ marginTop: "3rem" }}
              label={
                <Typography
                  style={{
                    fontSize: "1.35rem",
                    fontFamily: "Montserrat-Regular",
                    color: "black",
                  }}
                >
                  I understand that this game involves an element of financial
                  risk and can be addictive.
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={acceptedTerm2}
                  onChange={() => setAcceptedTerm2((val) => !val)}
                  name="checkedB"
                  color="primary"
                />
              }
              style={{ marginTop: "3rem" }}
              label={
                <Typography
                  style={{
                    fontSize: "1.35rem",
                    fontFamily: "Montserrat-Regular",
                    color: "black",
                  }}
                >
                  I understand that I am using this website at my own risk. Any
                  losses incurred due to my actions are my own responsibility
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={acceptedTerm3}
                  onChange={() => setAcceptedTerm3((val) => !val)}
                  name="checkedC"
                  color="primary"
                />
              }
              style={{ marginTop: "3rem", marginBottom: "1rem" }}
              label={
                <Typography
                  style={{
                    fontSize: "1.35rem",
                    fontFamily: "Montserrat-Regular",
                    color: "black",
                  }}
                >
                  Using Smart Contracts, Tokens, and Crypto is always a risk. I
                  am participating at my own risk
                </Typography>
              }
            />
          </div>
          <StylizedButton
            style={{
              margin: "auto",
              width: "100%",
              padding: "1.5rem",
              background: "var(--c-blue)",
              color: "white",
              borderRadius: 0,
            }}
            onClick={onContinue}
            disabled={!acceptedTerm1 || !acceptedTerm2}
          >
            <Typography
              style={{ fontFamily: "Montserrat-Regular", fontSize: "1.5rem" }}
            >
              Continue
            </Typography>
          </StylizedButton>
        </div>
      </Fade>
    </Modal>
  );
}

export default Consent;
