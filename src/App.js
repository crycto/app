import "./crycto.css";
import "./rangeslider.css";
import "./crycto-n.css";
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
import { Alert, AlertTitle } from "@material-ui/lab";
import Footer from "./components/footer";

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
              <Header />
              <Home />
              {/* <Footer /> */}
            </TournamentProvider>
          </ApolloProvider>
        </WalletProvider>
      </OnChainProvider>
    </ThemeProvider>
  );
}

export default App;
