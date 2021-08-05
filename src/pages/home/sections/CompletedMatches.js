import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { Grow, CircularProgress } from "@material-ui/core";
import TinyCard from "../../../components/match/latest/TinyCard";
import { COMPLETED_MATCHES, LATEST_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import { useWallet } from "../../../providers/WalletProvider";

const fiveDaysAgo = parseInt(
  +new Date().setDate(new Date().getDate() - 1) / 1000
);

function CompletedMatches() {
  const { account = "" } = useWallet();
  const { data, loading, error } = useQuery(COMPLETED_MATCHES, {
    variables: {
      connectedUser: account,
    },
    // pollInterval: 20 * 1000,
  });

  if (error) {
    return null;
  }
  return (
    <>
      <div class="crycto-app--heading">
        <h1 class="">Completed Matches</h1>
      </div>

      <div className="crycto-instruction">
        {loading && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </div>
        )}
        {data?.matches?.map((m) => (
          <Grow in={true}>
            <TinyCard key={m.id} match={new Match(m)} />
          </Grow>
        ))}
      </div>
    </>
  );
}

export default CompletedMatches;
