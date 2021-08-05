import React from "react";
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
      </section>
    </main>
  );
}

export default Home;
