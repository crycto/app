import React, { useState } from "react";
import localStorage from "../../localstorage";
import Icon from "./Icon";
import CloseIcon from "@material-ui/icons/Close";
import { useWallet } from "../../providers/WalletProvider";
import { Fade } from "@material-ui/core";
import { chains, NETWORK, TournamentContract } from "../../web3";

function Banner() {
  const [showBanner, setShowBanner] = useState(
    localStorage.get("crycto-hide-new-user-banner") !== "true"
  );
  const { active, connect } = useWallet();
  const handleClose = () => {
    setShowBanner(false);
    localStorage.set("crycto-hide-new-user-banner", true);
  };
  return !showBanner ? null : (
    <section className="crycto-new-user-section">
      <div className="crycto-new-user-section-left">
        <label>Cricket meets Crypto. Play with as low as ₹1</label>
        <span>
          Put your cricketing cap on and use your skills to make your expert
          score predictions and get back crazy rewards when you win. &nbsp;
        </span>
      </div>
      <div className="crycto-new-user-section-right">
        <div className="crycto-new-user-bg-player">
          <Icon name="bannerPlayer" alt="" />
        </div>
      </div>
      <div className="crycto-new-user-section-links">
        <div
          className="play-now-btn"
          onClick={!active ? connect : () => document.body.scrollTo(0, 250)}
        >
          Play now
        </div>
        <a
          href="https://metamask.io/download.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Install MetaMask
        </a>
        <a
          href="https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Configure Polygon
        </a>
        <a
          href="https://wazirx.com/exchange/MATIC-INR"
          target="_blank"
          rel="noopener noreferrer"
        >
          Add funds to your wallet
        </a>
      </div>
      <CloseIcon
        className="crycto-new-user-section-close"
        onClick={handleClose}
      />
    </section>
  );
}

//  <div class="crycto-new-user-section-content">

//           <div className="crycto-new-user-section-contetnt-bottom">
//             <div
//               className="crycto-new-user-section-button"
//               onClick={!active ? connect : () => document.body.scrollTo(0, 200)}
//             >
//               Play now
//             </div>
//             <a
//               href="https://metamask.io/index.html"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Install MetaMask
//             </a>
//             <a
//               href="https://global.transak.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Add funds to your wallet
//             </a>
//           </div>
//         </div>

export default Banner;
