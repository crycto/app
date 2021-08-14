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

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  tableContainer: {
    margin: "3rem auto",
    display: "flex",
    width: "95%",
    borderRadius: 5,
    background: "transparent",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  table: {
    minWidth: 650,
    background: "linear-gradient(45deg, #2d158c, #865f0a)",
    minHeight: 600,
    overflow: "scroll",
  },
});

const TableCell = withStyles((theme) => ({
  head: {
    color: "white",
    fontSize: "1.3rem",
    borderBottom: "1px solid rgb(249 249 249 / 6%)",
    fontFamily: "var(--crycto-font-montserrat)",
    padding: "2rem 2rem",
  },
  body: {
    fontSize: "1.35rem",
    fontFamily: "var(--crycto-font-montserrat)",
    padding: "1.5rem 2rem",
    borderBottom: "none",

    color: "white",
    height: "7rem",
  },
  footer: {
    color: "white",
    fontSize: "1.5rem",
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
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell align="center">Match</TableCell>
              <TableCell align="center">Final Score</TableCell>
              <TableCell align="center">Bets</TableCell>
              <TableCell align="center">Pool</TableCell>
              <TableCell align="center">Winners</TableCell>
              <TableCell align="center">Rewards</TableCell>
              <TableCell align="center">Payout</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.matches.map((m) => {
              const match = new Match(m);
              return (
                <TableRow key={match.id}>
                  <TableCell component="th" scope="row">
                    {parseInt(match.id)}
                  </TableCell>
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
                  <TableCell align="center">
                    {match.totalBets == 0 ? "-" : match.totalBets}
                  </TableCell>
                  <TableCell align="center">
                    {match.totalAmount == 0 ? "-" : match.totalAmount}
                  </TableCell>
                  <TableCell align="center">
                    {match.totalWinners == 0 ? "-" : match.totalWinners}
                  </TableCell>
                  <TableCell align="center">
                    {match.rewardAmount == 0 ? "-" : match.rewardAmount}
                  </TableCell>

                  <TableCell align="center">
                    {match.isCompleted()
                      ? `${match.getWinningPayout()} x`
                      : "-"}
                  </TableCell>
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
                page={parseInt(skip / LIMIT)}
                onPageChange={(_, page) => setSkip(page * LIMIT)}
                component={({ children }) => (
                  <TableCell colSpan={9}>{children}</TableCell>
                )}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

const useFooterStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    fontSize: "3rem",
    paddingRight: "1rem",
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
  const { page, onPageChange } = props;

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
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
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
