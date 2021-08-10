import React from "react";
import { useWallet } from "../../providers/WalletProvider";
import Icon from "./Icon";

function HowToPlay() {
  const { active, connect } = useWallet();
  return active ? null : (
    <section class="crycto-how-section">
      <div class="crycto-how-left">
        <label>How do I play ? </label>
        <span>
          <Icon name="metamask" className="c-how-bullet" /> You need MetaMask to
          be able to interact with the game
        </span>
        <span>
          <Icon name="polygon" className="c-how-bullet" /> Once you've got that,
          connect your wallet to Polygon Network
        </span>
        <span>🏏 Well, that's it. Happy cricketing ! </span>
      </div>
      <div class="crycto-how-right">
        {window.ethereum ? (
          <span onClick={connect}>
            Connect <Icon name="metamask" className="c-metamask" />
          </span>
        ) : (
          <span
            onClick={() =>
              window.open(
                "https://metamask.io/index.html",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            Install MetaMask <Icon name="metamask" className="c-metamask" />
          </span>
        )}
      </div>
    </section>
  );
}

export default HowToPlay;
