import React from "react";
import Footer from "../../components/footer";
import CompletedMatches from "./sections/CompletedMatches";
import LatestMatches from "./sections/LatestMatches";

function Home() {
  return (
    <main className="crycto-maincontainer">
      <section className="crycto-app--section">
        <LatestMatches />
      </section>
      <section className="crycto-app--section bgblue">
        <CompletedMatches />
        <Footer />
      </section>
    </main>
  );
}

export default Home;
