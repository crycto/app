import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import { useTheme } from "../../../providers/ThemeProvider";
import isMobileBrowser from "../../../utils/isMobileBrowser";

const isMobile = isMobileBrowser();
const skeletonDark = "rgb(255 255 255 / 5%)";
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
      <div className="w100 front-screen">
        <div className="crycto-card-top-container">
          <Skeleton
            animation="wave"
            width={"50%"}
            height={isMobile ? 12 : 21}
            style={{ backgroundColor, margin: "auto" }}
          />
        </div>
        <div className="crycto-card--blk--visible body-container">
          <Skeleton
            variant="rect"
            animation="wave"
            style={{
              width: "90%",
              height: isMobile ? 40 : 91,
              borderRadius: 5,
              backgroundColor,
              margin: "auto",
            }}
          />
        </div>
        <div className="crycto-card--maincontent bottom-container">
          <Skeleton
            variant="rect"
            animation="wave"
            style={{
              width: "80%",
              height: isMobile ? 20 : 35,
              borderRadius: 5,
              backgroundColor,
              margin: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
