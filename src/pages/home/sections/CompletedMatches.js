import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import TinyCard from "../../../components/match/latest/TinyCard";
import { COMPLETED_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import { useWallet } from "../../../providers/WalletProvider";
import InfiniteScroll from "../../../components/utils/InfiniteScroll";

const LIMIT = 25;
const pollInterval = 120 * 1000;
function CompletedMatches() {
  const { account = "" } = useWallet();
  const { data, loading, error, called, refetch, fetchMore } = useQuery(
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
  const [loadMore, setLoadMore] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);
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

  if (error) {
    return null;
  }
  return (
    <>
      <div className="crycto-app--heading">
        <h1>Completed Matches</h1>
      </div>

      <InfiniteScroll loadMore={loadMore} onLoadMore={onLoadMore}>
        {data?.matches?.map((m) => (
          <TinyCard key={m.id} match={new Match(m)} />
        ))}
        {(loading || loadingMore) && <Spinner />}
      </InfiniteScroll>
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
