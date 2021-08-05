import { useQuery } from "@apollo/client";
import React from "react";
import { CircularProgress } from "@material-ui/core";
import TinyCard from "../../../components/match/latest/TinyCard";
import { COMPLETED_MATCHES } from "../../../graphql/queries";
import Match from "../../../models/Match";
import { useWallet } from "../../../providers/WalletProvider";

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
      <div className="crycto-app--heading">
        <h1>Completed Matches</h1>
      </div>

      <div className="crycto-instruction" style={{ overflow: "visible" }}>
        {loading && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </div>
        )}
        {data?.matches?.map((m) => (
          <TinyCard key={m.id} match={new Match(m)} />
        ))}
      </div>
    </>
  );
}

export default CompletedMatches;
