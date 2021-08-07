import React from "react";

import { Alert } from "@material-ui/lab";
import { Link, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
export default function AlertMessage({
  severity,
  title,
  link,
  linkText,
  onClose,
  ...props
}) {
  return (
    <Alert
      severity={severity}
      style={{
        position: "absolute",
        top: "11vh",
        right: "2%",
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.1))",
        zIndex: 99999,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "white",
        color: "black",
      }}
      {...props}
    >
      <CloseIcon
        fontSize="medium"
        style={{
          position: "absolute",
          top: 8,
          right: 10,
          cursor: "pointer",
        }}
        onClick={onClose}
      />
      <Typography
        style={{
          fontFamily: "Montserrat-Regular",
          fontSize: "1.1rem",
          padding: "0 2rem 0 0",
          maxWidth: 250,
        }}
      >
        {title}

        <br />
        <Link href="#" onClick={() => window.open(link, "_blank", "noopener")}>
          {linkText}
        </Link>
      </Typography>
    </Alert>
  );
}
