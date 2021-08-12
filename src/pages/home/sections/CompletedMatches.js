import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import {
  CircularProgress,
  withStyles,
  makeStyles,
  Paper,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import UITableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TinyCard from "../../../components/match/latest/TinyCard";
import { COMPLETED_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import { useWallet } from "../../../providers/WalletProvider";
import InfiniteScroll from "../../../components/utils/InfiniteScroll";
import TinyCardSkeleton from "../../../components/match/latest/TinyCardSkeleton";

const useStyles = makeStyles({
  tableContainer: {
    margin: "5% auto",
    display: "flex",
    width: "90%",
    borderRadius: 10,
  },
  table: {
    minWidth: 650,
    fontSize: 30,
  },
  tableHeader: {
    background: "var(--c-gold)",
  },
});

const TableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "hsl(177deg 66% 26%)",
    color: theme.palette.common.white,
    fontSize: "1.5rem",
    fontFamily: "var(--crycto-font-righteous)",
    fontFamily: "var(--crycto-font-montserrat)",
    padding: "2rem 1rem",
    textTransform: "uppercase",
  },
  body: {
    fontSize: 14,
    fontFamily: "var(--crycto-font-montserrat)",
  },
}))(UITableCell);

const LIMIT = 15;
const pollInterval = 120 * 1000;
function CompletedMatches() {
  const { account = "" } = useWallet();
  const [loadMore, setLoadMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { data, loading, called, refetch, fetchMore } = useQuery(
    COMPLETED_MATCHES,
    {
      variables: {
        first: LIMIT,
        connectedUser: account,
      },
      // pollInterval: 120 * 1000,
    }
  );
  useEffect(() => {
    if (called && !loading) {
      setLoadMore(data?.matches?.length === LIMIT);
    }
  }, [called, loading]);
  useEffect(() => {
    const _id = setInterval(() => {
      console.log("returns");
      if (!data) {
        return;
      }
      const limit = Math.max(
        data?.matches.length + (data?.matches.length % LIMIT) + 1,
        LIMIT
      );

      refetch({
        first: limit,
      }).then(({ data }) => {
        setLoadMore(data.matches.length === limit);
      });
    }, pollInterval);
    return () => clearInterval(_id);
  }, [data, refetch]);

  const onLoadMore = useCallback(() => {
    if (!data) {
      return;
    }
    setLoadMore(false);
    setLoadingMore(true);
    fetchMore({
      variables: {
        skip: data.matches.length,
      },
    })
      .then(({ data }) => {
        setLoadingMore(false);
        setLoadMore(data.matches.length === LIMIT);
      })
      .catch(console.log);
  }, [fetchMore, data]);
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

              <TableCell align="center">Winner Payout</TableCell>
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
                  <TableCell align="center">{`${match?.matchDetails?.team1} vs ${match?.matchDetails?.team2}`}</TableCell>
                  <TableCell align="center">
                    {match.getWinningScoreRange()}
                  </TableCell>
                  <TableCell align="center">{match.totalBets}</TableCell>
                  <TableCell align="center">{match.totalAmount}</TableCell>
                  <TableCell align="center">{match.totalWinners}</TableCell>
                  <TableCell align="center">{match.rewardAmount}</TableCell>

                  <TableCell align="center">
                    {match.isCompleted() && `${match.getWinningPayout()} x`}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>{loading && <Spinner />}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

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

export default CompletedMatches;

{
  /* <InfiniteScroll loadMore={loadMore} onLoadMore={onLoadMore}>
{data?.matches?.map((m) => (
  <TinyCard key={m.id} match={new Match(m)} />
))}
{called &&
  !loading &&
  (!data || data?.matches?.length === 0) &&
  Array(7)
    .fill(0)
    .map(() => <TinyCardSkeleton />)}
{(loading || loadingMore) && <Spinner />}
</InfiniteScroll> */
}
