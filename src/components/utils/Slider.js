import { Slider, withStyles } from "@material-ui/core";
import isMobileBrowser from "../../utils/isMobileBrowser";

const isMobile = isMobileBrowser();
export default withStyles({
  root: {
    color: "var(--c-gold)",
    height: 3,
    width: "75%",
  },
  thumb: {
    height: isMobileBrowser() ? 15 : 20,
    width: isMobileBrowser() ? 15 : 20,
    backgroundColor: "white",
    border: "4px solid var(--c-gold)",
    marginTop: isMobile ? -6 : -8.75,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  // valueLabel: {
  //   left: "calc(-50% + 4px)",
  //   color: "black",
  // },
  markLabel: {
    color: "hsl(224, 57%, 38%, 1)",
    marginTop: 5,
    fontWeight: "bolder",
    fontFamily: "inherit",
    fontSize: "0.7rem",
  },
  markActive: {
    backgroundColor: "transparent",
  },
  mark: {
    color: "var(--c-gold)",
    height: 3,
    width: 1,
  },
  track: {
    height: 3,
    borderRadius: 4,
  },
  rail: {
    height: 3,
    borderRadius: 4,
  },
})(Slider);
