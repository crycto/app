import React, { useCallback } from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import moment from "moment";

function MonthNavigator({ value, setMonth }) {
  const handlePreviousNav = useCallback(
    () =>
      setMonth((m) => {
        var fm = moment(m).subtract(1, "M");
        var fmEnd = moment(fm).startOf("month");
        return m.date() !== fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
          ? fm.subtract(1, "d")
          : fm;
      }),
    [setMonth]
  );
  const handleNextNav = useCallback(
    () =>
      setMonth((m) => {
        var fm = moment(m).add(1, "M");
        var fmEnd = moment(fm).endOf("month");
        return m.date() !== fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
          ? fm.add(1, "d")
          : fm;
      }),
    [setMonth]
  );
  return (
    <div className="month-navigator">
      <ArrowLeftIcon
        fontSize="inherit"
        className="cp"
        onClick={handlePreviousNav}
      />
      <span>{value.format("MMM YYYY")}</span>
      <ArrowRightIcon
        fontSize="inherit"
        className="cp"
        onClick={handleNextNav}
      />
    </div>
  );
}

export default MonthNavigator;
