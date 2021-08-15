import { CircularProgress } from "@material-ui/core";
import React from "react";
const defaultStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  color: "white",
};
export default function Spinner({
  containerClass,
  containerStyle,
  size = "1.5rem",
}) {
  return (
    <div className={containerClass} style={containerStyle ?? defaultStyle}>
      <CircularProgress size={size} color="inherit" />
    </div>
  );
}
