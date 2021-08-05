import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import { useTheme } from "../../../providers/ThemeProvider";

const skeletonDark = "rgb(80 106 235 / 11%)";
const skeletonLight = "rgb(80 106 235 / 11%)";
function CardSkeleton() {
  const { isLightTheme } = useTheme();
  const backgroundColor = isLightTheme ? skeletonLight : skeletonDark;
  return (
    <div
      className={`crycto-card--blk overflow-hide`}
      style={{
        background: isLightTheme ? "white" : "#0a1421",
        borderColor: backgroundColor,
      }}
    >
      <div
        className="crycto-card--blk--visible"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "2%",
        }}
      >
        <Skeleton
          variant="rect"
          animation="wave"
          style={{
            width: "40%",
            height: "10%",
            borderRadius: 5,
            backgroundColor,
          }}
        />
        <div
          className="crycto-card--text"
          style={{ marginTop: 0, paddingTop: "3%" }}
        >
          <span
            className="crycto-card--labels"
            style={{ padding: 0, backgroundColor: "transparent" }}
          >
            <Skeleton
              animation="wave"
              width={30}
              height={30}
              style={{ backgroundColor }}
            />
          </span>
          <span
            className="crycto-card--labels"
            style={{ padding: 0, backgroundColor: "transparent" }}
          >
            <Skeleton
              animation="wave"
              width={70}
              height={30}
              style={{ backgroundColor }}
            />
          </span>
          <span
            className="crycto-card--labels"
            style={{ padding: 0, backgroundColor: "transparent" }}
          >
            <Skeleton
              animation="wave"
              width={70}
              height={30}
              style={{ backgroundColor }}
            />
          </span>
        </div>

        <Skeleton
          variant="rect"
          animation="wave"
          style={{
            width: "65%",
            height: "15%",
            marginTop: "8%",
            borderRadius: 5,
            backgroundColor,
          }}
        />
        <Skeleton
          variant="rect"
          animation="wave"
          style={{
            width: "80%",
            height: "12rem",
            marginTop: "9%",
            borderRadius: 5,
            backgroundColor,
          }}
        />
        <label className="crycto-card--cta" style={{ backgroundColor }}>
          &nbsp;
        </label>
      </div>
    </div>
  );
}

export default CardSkeleton;
