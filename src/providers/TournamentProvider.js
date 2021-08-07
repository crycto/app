import { useQuery } from "@apollo/client";

import React, { createContext, useContext } from "react";
import { TOURNAMENT } from "../graphql/queries";

const TournamentContext = createContext({});

function TournamentProvider({ children }) {
  const { data } = useQuery(TOURNAMENT);

  return (
    <TournamentContext.Provider value={{ ...data?.tournament }}>
      {children}
    </TournamentContext.Provider>
  );
}

export const useTournament = () => useContext(TournamentContext);

export default TournamentProvider;
