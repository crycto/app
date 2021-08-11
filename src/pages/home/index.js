import React from "react";
import Footer from "../../components/footer";
import Banner from "../../components/utils/Banner";
import HowToPlay from "../../components/utils/HowToPlay";
import TournamentStats from "../../components/utils/TournamentStats";
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
      <section className="crycto-app--section bgblue">
        <CompletedMatches />
        <Footer />
      </section>
    </main>
  );
}

export default Home;
