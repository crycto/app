import { withStyles, LinearProgress } from "@material-ui/core";

export default withStyles((theme) => ({
  root: {
    borderRadius: 5,
    position: "fixed",
    top: 0,
    width: "100%",
  },
  colorPrimary: {
    backgroundColor: "transparent",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "hsl(224, 57%, 48%, 1)",
  },
}))(LinearProgress);
