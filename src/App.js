import "./crycto.css";
import "./rangeslider.css";
import "./crycto-n.css";
import "./crycto-labs.scss";
import Header from "./components/header";
// import { useTournament } from "./providers/TournamentProvider";
import Home from "./pages/home";
import { useEffect, useState } from "react";
import initializeClient from "./apollo";
import { ApolloProvider } from "@apollo/client";
import TournamentProvider from "./providers/TournamentProvider";
import WalletProvider from "./providers/WalletProvider";
import ThemeProvider from "./providers/ThemeProvider";
import OnChainProvider from "./providers/OnChainProvider";
import Consent from "./components/utils/Consent";
import TopBanner from "./components/utils/TopBanner";
import { NETWORK } from "./web3";

function App() {
  // const tournament = useTournament();
  const [client, setClient] = useState();

  useEffect(
    () =>
      initializeClient()
        .then((c) => setClient(c))
        .catch(console.error),
    []
  );

  if (!client) {
    return null;
  }

  return (
    <ThemeProvider>
      <OnChainProvider>
        <WalletProvider>
          <ApolloProvider client={client}>
            <TournamentProvider>
              {NETWORK === "MUMBAI" && <TopBanner />}
              <Header />
              <Home />
              {/* <Consent /> */}
            </TournamentProvider>
          </ApolloProvider>
        </WalletProvider>
      </OnChainProvider>
    </ThemeProvider>
  );
}

export default App;
