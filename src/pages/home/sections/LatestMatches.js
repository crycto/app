import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { LATEST_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import Card from "../../../components/match/latest/Card";

import CardSkeleton from "../../../components/match/latest/CardSkeleton";
import InfiniteScroll from "../../../components/utils/InfiniteScroll";
import AppProgress from "../../../components/utils/AppProgress";
import { useWallet } from "../../../providers/WalletProvider";

const deadline = parseInt(+new Date().setDate(new Date().getDate() - 2) / 1000);

const skelArr = Array(4).fill(0);

const LIMIT = 10;

const pollInterval = 60 * 1000;

function LatestMatches() {
  const { triedEager, account = "" } = useWallet();

  const { data, loading, error, called, refetch, fetchMore } = useQuery(
    LATEST_MATCHES,
    {
      variables: {
        first: LIMIT,
        deadline,
        connectedUser: account,
      },
    }
  );
  const [loadMore, setLoadMore] = useState(true);
  useEffect(() => {
    if (called && !loading) {
      setLoadMore(data.matches.length === LIMIT);
    }
  }, [called, loading]);

  useEffect(() => {
    const _id = setInterval(() => {
      if (!data?.matches) {
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

  if (loading || !triedEager) {
    return (
      <div className="crycto-instruction latest c-skeleton">
        <AppProgress />
        {skelArr.map((_, i) => (
          <CardSkeleton key={i + ""} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontSize: "1.5rem",
          fontFamily: "'Montserrat-Regular'",
          color: "var(--c-gold)",
        }}
      >
        We're having trouble loading the latest matches. Take deep breaths while
        we fix this thing :)
      </div>
    );
  }
  return (
    <InfiniteScroll
      className="latest"
      horizontal
      loadMore={loadMore}
      onLoadMore={onLoadMore}
    >
      {data?.matches?.map((m) => (
        <Card key={m.id} match={new Match(m)} />
      ))}
      {loadingMore && <CardSkeleton color="inherit" />}
    </InfiniteScroll>
  );
}

export default LatestMatches;
