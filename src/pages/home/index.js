import React from "react";
import Footer from "../../components/footer";
import Banner from "../../components/utils/Banner";
import EarlySupport from "../../components/utils/EarlySupport";
import HowToPlay from "../../components/utils/HowToPlay";
import TournamentStats from "../../components/utils/TournamentStats";
import { NETWORK } from "../../web3";
import CompletedMatches from "./sections/CompletedMatches";
import LatestMatches from "./sections/LatestMatches";

function Home() {
  return (
    <main className="crycto-maincontainer">
      <Banner />
      <section className="crycto-app--section">
        <LatestMatches />
      </section>
      <HowToPlay />
      <TournamentStats />
      {NETWORK === "MUMBAI" && <EarlySupport />}
      <section className="crycto-app--section bgblue completed">
        <CompletedMatches />
        <Footer />
      </section>
    </main>
  );
}

export default Home;
