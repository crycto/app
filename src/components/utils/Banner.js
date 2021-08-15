import React, { useState } from "react";
import localStorage from "../../localstorage";
import Icon from "./Icon";
import CloseIcon from "@material-ui/icons/Close";
import { useWallet } from "../../providers/WalletProvider";
import { Fade } from "@material-ui/core";
import { chains, NETWORK, TournamentContract } from "../../web3";

function Banner() {
  const [showBanner, setShowBanner] = useState(
    localStorage.get("crycto-hide-new-user-banner") != "true"
  );
  const { active, connect } = useWallet();
  const handleClose = () => {
    setShowBanner(false);
    localStorage.set("crycto-hide-new-user-banner", true);
  };
  return !showBanner ? null : (
    <Fade in={true} style={{ transitionDelay: "150ms" }}>
      <section className="crycto-new-user-section">
        <div className="crycto-new-user-section-app">
          <label>Global Fantasy Cricket On The Blockchain</label>
          <span>Where Cricket meets Crypto</span>
          <div class="crycto-new-user-section-contetnt-bottom">
            <a
              href="https://github.com/crycto/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Source
            </a>
            <a
              href={`https://polygonscan.com/address/${
                TournamentContract[chains[NETWORK].id][1]
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Smart Contract
            </a>
            <a
              href="https://polygon.technology/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polygon Network
            </a>
          </div>
        </div>
        <div class="crycto-new-user-section-image-container">
          {/* <Icon name="stars" className="crycto-new-user-section-stars" /> */}
          <Icon name="trophy" className="crycto-new-user-section-image" />
        </div>
        <div class="crycto-new-user-section-content">
          <label>Are you ready to take on the world ?</label>
          <span>
            Put your cricketing cap on and get the chance to win crazy rewards.
            You can start with as low as ₹1
          </span>
          <div className="crycto-new-user-section-contetnt-bottom">
            <div
              className="crycto-new-user-section-button"
              onClick={!active ? connect : () => document.body.scrollTo(0, 200)}
            >
              Play now
            </div>
            <a
              href="https://metamask.io/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install MetaMask
            </a>
            <a
              href="https://global.transak.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add funds to your wallet
            </a>
          </div>
        </div>

        <CloseIcon
          className="crycto-new-user-section-close"
          onClick={handleClose}
        />
      </section>
    </Fade>
  );
}

export default Banner;
