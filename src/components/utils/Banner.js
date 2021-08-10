import React, { useState } from "react";
import localStorage from "../../localstorage";
import Icon from "./Icon";
import CloseIcon from "@material-ui/icons/Close";
import { useWallet } from "../../providers/WalletProvider";
import { Fade } from "@material-ui/core";

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
    <Fade in={true} style={{ transitionDelay: "100ms" }}>
      <section className="crycto-new-user-section">
        <div className="crycto-new-user-section-app">
          <label>Open, Permissionless, Trustless</label>
          <span>Fantasy Cricket On The BlockChain</span>
          <div class="crycto-new-user-section-contetnt-bottom">
            <a
              href="https://metamask.io/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
            <a
              href="https://metamask.io/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Smart Contract
            </a>
            <a
              href="https://polygonscan.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check in block explorer
            </a>
          </div>
        </div>
        <div class="crycto-new-user-section-image-container">
          <Icon name="stars" className="crycto-new-user-section-stars" />
          <Icon name="trophy" className="crycto-new-user-section-image" />
        </div>
        <div class="crycto-new-user-section-content">
          <label>Are you secretly the best pitch expert in the world ?</label>
          <span>
            Put you're cricketing cap on and get the chance to win crazy rewards
          </span>
          <div className="crycto-new-user-section-contetnt-bottom">
            <div
              className="crycto-new-user-section-button"
              onClick={!active ? connect : null}
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
