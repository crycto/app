import React from "react";
import Footer from "../../components/footer";
import Banner from "../../components/utils/Banner";
import EarlySupport from "../../components/utils/EarlySupport";
import HowToPlay from "../../components/utils/HowToPlay";
import TournamentStats from "../../components/utils/TournamentStats";
import { useTheme } from "../../providers/ThemeProvider";
import { NETWORK } from "../../web3";
import CompletedMatches from "./sections/CompletedMatches";
import LatestMatches from "./sections/LatestMatches";

function Home() {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <main className="crycto-maincontainer">
      <Banner />

      <section className="crycto-app--section">
        <LatestMatches />
      </section>

      <HowToPlay />

      <TournamentStats />

      <section
        id="completedRounds"
        className="crycto-app--section bgblue completed"
      >
        {/* <div className="shape" /> */}
        <CompletedMatches />
        {NETWORK === "MUMBAI" && <EarlySupport />}
        <Footer />
      </section>
    </main>
  );
}

export default Home;
