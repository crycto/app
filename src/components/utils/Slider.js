import { Slider, withStyles } from "@material-ui/core";

export default withStyles({
  root: {
    color: "var(--c-gold)",
    height: 3,
    width: "75%",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    border: "4px solid var(--c-gold)",
    marginTop: -9,
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
    color: "transparent",
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
