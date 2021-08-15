import { useQuery } from "@apollo/client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TOURNAMENT } from "../graphql/queries";
import { getTotalRounds } from "../web3";

const TournamentContext = createContext({});

function TournamentProvider({ children }) {
  const { data } = useQuery(TOURNAMENT);
  const [totalRounds, setTotalRounds] = useState(0);
  useEffect(() => {
    getTotalRounds().then((r) => {
      console.log(r);
      setTotalRounds(r.toString());
    });
  }, []);

  return (
    <TournamentContext.Provider value={{ ...data?.tournament, totalRounds }}>
      {children}
    </TournamentContext.Provider>
  );
}

export const useTournament = () => useContext(TournamentContext);

export default TournamentProvider;
