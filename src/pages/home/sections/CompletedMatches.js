import { useQuery } from "@apollo/client";
import React, { memo, useEffect, useState } from "react";
import {
  CircularProgress,
  withStyles,
  makeStyles,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import UITableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ClaimRefundButton from "../../../components/match/latest/ClaimRefundButton";
import { COMPLETED_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import { useWallet } from "../../../providers/WalletProvider";
import isMobileBrowser from "../../../utils/isMobileBrowser";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const isMobile = isMobileBrowser();

const useStyles = makeStyles({
  tableContainer: {
    margin: "3rem auto",
    display: "flex",
    width: "95%",
    borderRadius: 10,
    background: "inherit",
    boxShadow:
      "inset 10px 10px 15px rgb(5 5 5 / 40%), inset -5px -5px 10px rgb(92 91 91 / 10%)",
    fontSize: "var(--font-size)",
    border: "1px solid #a9791a",
    zIndex: 2,
  },
  table: {
    minWidth: isMobile ? "auto" : 650,
    minHeight: isMobile ? "auto" : 600,
    overflow: isMobile ? "auto" : "scroll",
  },
  tableHead: {
    // background: "linear-gradient(296deg, #403113,#48340a, #46330e)",
  },
});

const TableCell = withStyles((theme) => ({
  head: {
    // color: "#a9791a",
    fontSize: isMobile ? "1rem" : "1.3em",
    border: "none",
    borderBottom: "1px solid #3a393880",
    fontFamily: "Righteous-Regular",
    padding: "2.5em .5em 2em",
    textTransform: "uppercase",
    color: "#a9791a",
    // color: "white",
    textAlign: "center",

    // background: "rgba(255,255,255,0.1)",
  },
  body: {
    fontSize: isMobile ? "1.8em" : "1.35em",
    fontFamily: "var(--crycto-font-montserrat)",
    padding: isMobile ? 0 : "1.5em 2em",
    borderBottom: "1px solid #3a393880",
    color: "white",
    height: "7em",
    textAlign: "center",
  },
  footer: {
    color: "white",
    fontSize: "1.5em",
    borderBottom: "none",
    fontFamily: "var(--crycto-font-montserrat)",
    padding: 0,
  },
}))(UITableCell);

const LIMIT = 10;
const pollInterval = 120 * 1000;
function CompletedMatches() {
  const { account = "" } = useWallet();
  const [skip, setSkip] = useState(0);

  const { data, loading, error } = useQuery(COMPLETED_MATCHES, {
    variables: {
      first: LIMIT,
      skip,
      connectedUser: account,
    },
    pollInterval,
  });

  useEffect(() => {
    if (!loading && skip > 0 && data?.matches?.length === 0) {
      setSkip((skip) => skip - LIMIT);
    }
  }, [data]);

  const classes = useStyles();

  // if (error) {
  //   return null;
  // }
  return (
    <>
      <div className="crycto-app--heading">
        <h1>Completed Rounds</h1>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableHead}>
              {!isMobile && (
                <TableCell className={classes.tableHeader}>ID</TableCell>
              )}
              <TableCell align="center">Round</TableCell>
              <TableCell align="center">Final Score</TableCell>

              {!isMobile && (
                <>
                  <TableCell align="center">Bets</TableCell>
                  <TableCell align="center">Pool</TableCell>
                </>
              )}
              <TableCell align="center">Winners</TableCell>
              {!isMobile && <TableCell align="center">Rewards</TableCell>}
              <TableCell align="center">Payout</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.matches.map((m) => {
              const match = new Match(m);
              return (
                <TableRow key={match.id}>
                  {!isMobile && (
                    <TableCell component="th" scope="row">
                      {parseInt(match.id)}
                    </TableCell>
                  )}
                  <TableCell align="center">{`${
                    match?.matchDetails?.team1
                  } vs ${match?.matchDetails?.team2} ${
                    match?.matchDetails?.period > 0
                      ? " - " + match?.matchDetails?.getPeriodText()
                      : ""
                  }`}</TableCell>
                  <TableCell align="center">
                    {match.getWinningScoreRange() ?? "-"}
                  </TableCell>

                  {!isMobile && (
                    <>
                      <TableCell align="center">
                        {match.totalBets == 0 ? "-" : match.totalBets}
                      </TableCell>
                      <TableCell align="center">
                        {match.totalAmount == 0 ? "-" : match.totalAmount}
                      </TableCell>
                    </>
                  )}
                  <TableCell align="center">
                    {match.totalWinners == 0 ? "-" : match.totalWinners}
                  </TableCell>
                  {!isMobile && (
                    <TableCell align="center">
                      {match.rewardAmount == 0 ? "-" : match.rewardAmount}
                    </TableCell>
                  )}
                  <TableCell align="center">
                    {match.isCompleted()
                      ? `${match.getWinningPayout()} x`
                      : "-"}
                  </TableCell>
                  <Status match={match} />
                </TableRow>
              );
            })}
            {loading ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              skip === 0 &&
              (!data?.matches || data?.matches?.length === 0 || error) && (
                <TableRow style={{ height: 70 * LIMIT }}>
                  <TableCell colSpan={9}>
                    Come back later to view the completed rounds
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                labelDisplayedRows={() => null}
                colSpan={9}
                count={-1}
                rowsPerPage={LIMIT}
                component={({ children }) => (
                  <TableCell colSpan={9}>{children}</TableCell>
                )}
                ActionsComponent={() => (
                  <TablePaginationActions
                    page={parseInt(skip / LIMIT)}
                    onPageChange={(_, page) => setSkip(page * LIMIT)}
                    matchCount={data?.matches?.length}
                  />
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

const Status = ({ match }) => (
  <TableCell align="center">
    {match.isCompleted() ? (
      match.isBetPlaced() ? (
        match.isBetWon() ? (
          match.isClaimed() ? (
            <div className="action-button _claim _disable">
              <span>Claimed</span>
            </div>
          ) : (
            <ClaimRefundButton match={match} />
          )
        ) : (
          <div className="action-button _lost ">
            <span>Lost</span>
          </div>
        )
      ) : (
        <div className="action-button _completed ">
          <span>Completed</span>
        </div>
      )
    ) : match.isBetPlaced() ? (
      match.isRefunded() ? (
        <div className="action-button _refund _disable">
          <span>Refunded</span>
        </div>
      ) : (
        <ClaimRefundButton match={match} refund />
      )
    ) : (
      <div className="action-button _forfeited _disable">
        <span>Forfeited</span>
      </div>
    )}
  </TableCell>
);
const useFooterStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    fontSize: "3em",
    paddingRight: "1em",
  },
  icon: {
    cursor: "pointer",
    color: "white",
    "&:disabled": {
      opacity: 0.5,
    },
  },
}));

const TablePaginationActions = (props) => {
  const classes = useFooterStyles();
  const { page, onPageChange, matchCount } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        className={classes.icon}
      >
        <KeyboardArrowLeft fontSize="large" className={classes.icon} />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={matchCount % LIMIT !== 0}
        aria-label="next page"
        className={classes.icon}
      >
        <KeyboardArrowRight fontSize="large" className={classes.icon} />
      </IconButton>
    </div>
  );
};

const Spinner = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      color: "white",
    }}
  >
    <CircularProgress color="inherit" />
  </div>
);

export default memo(CompletedMatches);
