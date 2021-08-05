import { useQuery } from "@apollo/client";
import React from "react";
import { LATEST_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import Card from "../../../components/match/latest/Card";
import { Slide } from "@material-ui/core";
import CardSkeleton from "../../../components/match/latest/CardSkeleton";
import AppProgress from "../../../components/utils/AppProgress";
import { useWallet } from "../../../providers/WalletProvider";

const fiveDaysAgo = parseInt(
  +new Date().setDate(new Date().getDate() - 5) / 1000
);

const skelArr = Array(5).fill(0);

function LatestMatches() {
  const { account = "" } = useWallet();
  const { data, loading, error, fetchMore } = useQuery(LATEST_MATCHES, {
    variables: {
      deadline: fiveDaysAgo,
      connectedUser: account,
    },
    // pollInterval: 50 * 1000,
  });
  // fetchMore({
  //   variables: {
  //     skip: data.matches.length,
  //   },
  // })
  if (loading) {
    return (
      <div className="crycto-instruction c-skeleton">
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
        }}
      >
        We're having trouble loading the latest matches. Take deep breaths while
        we fix this thing :)
      </div>
    );
  }
  return (
    <div className="crycto-instruction">
      {data?.matches?.map((m) => (
        <Card key={m.id} match={new Match(m)} />
      ))}
    </div>
  );
}

export default LatestMatches;
