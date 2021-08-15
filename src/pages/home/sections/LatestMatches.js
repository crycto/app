import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { LATEST_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import Card from "../../../components/match/latest/Card";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CardSkeleton from "../../../components/match/latest/CardSkeleton";

import AppProgress from "../../../components/utils/AppProgress";
import { useWallet } from "../../../providers/WalletProvider";
import MonthNavigator from "../../../components/utils/MonthNavigator";
import moment from "moment";
import Icon from "../../../components/utils/Icon";
import { Checkbox, FormControlLabel, withStyles } from "@material-ui/core";

const skelArr = Array(4).fill(0);

const LIMIT = 10;

const pollInterval = 60 * 1000;

const curMoment = moment();

const scrollToCompletedRounds = () =>
  document.getElementsByClassName("completed")[0].scrollIntoView();

function LatestMatches() {
  const { triedEager, account = "" } = useWallet();
  const [month, setMonth] = useState(curMoment);
  const [activeOnly, setActiveOnly] = useState(false);
  const { data, loading, error } = useQuery(LATEST_MATCHES, {
    variables: {
      first: LIMIT,
      deadline_gte: parseInt(month.startOf("month").valueOf() / 1000),
      deadline_lte: parseInt(month.endOf("month").valueOf() / 1000),
      connectedUser: account,
    },
    pollInterval,
  });

  return (
    <>
      <MonthNavigator value={month} setMonth={setMonth} />
      <div className="active-only-filter">
        <CheckBox
          checked={activeOnly}
          onChange={(e) => setActiveOnly(e.target.checked)}
          name="checkedG"
        />
        <span onClick={() => setActiveOnly((a) => !a)}>
          Show active rounds only
        </span>
      </div>
      <div className="latest">
        {(!triedEager || loading) && (
          <>
            <AppProgress />
            {skelArr.map((_, i) => (
              <CardSkeleton key={i + ""} />
            ))}
          </>
        )}
        {data?.matches?.map((m) => {
          const match = new Match(m);
          if (activeOnly && !match.isBetPlaced() && !match.isTakingBets()) {
            return null;
          }
          return <Card key={m.id} match={match} />;
        })}
        {!loading && data?.matches?.length == 0 && (
          <div className="placeholder-screen">
            {/* <Icon name="logo" /> */}
            We do not have any rounds for this month !
            <div onClick={scrollToCompletedRounds}>Show Completed Rounds</div>
          </div>
        )}
        {!loading &&
          data?.matches?.length > 0 &&
          activeOnly &&
          data?.matches?.filter((m) => {
            const match = new Match(m);
            return !match.isBetPlaced() && !match.isTakingBets();
          }).length == 0 && (
            <div className="placeholder-screen">
              {/* <Icon name="logo" /> */}
              We do not have any active rounds for this month !
              <div onClick={scrollToCompletedRounds}>Show Completed Rounds</div>
            </div>
          )}
        {error && (
          <div className="placeholder-screen">
            We're having trouble loading rounds in {month.format("MMM")}. Take
            deep breaths while we fix this thing :)
            <div onClick={scrollToCompletedRounds}>Show Completed Rounds</div>
          </div>
        )}
      </div>
    </>
  );
}

const CheckBox = withStyles({
  root: {
    color: "var(--color-chips)",
    "&$checked": {
      color: "var(--c-gold)",
    },
    fontSize: "2rem",
  },
  checked: {},
})((props) => (
  <Checkbox
    color="default"
    icon={<CheckBoxOutlineBlankIcon fontSize="inherit" />}
    checkedIcon={<CheckBoxIcon fontSize="inherit" />}
    {...props}
  />
));

export default LatestMatches;
