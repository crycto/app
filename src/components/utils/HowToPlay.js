import React from "react";
import { useWallet } from "../../providers/WalletProvider";
import Icon from "./Icon";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function HowToPlay() {
  const { active, connect } = useWallet();
  return active ? null : (
    <section className="crycto-how-section">
      <div className="crycto-how-left">
        <label>HOW DO I PLAY ? </label>
        <span>
          {/* <Icon name="metamask" className="c-how-bullet" />  */}
          <FiberManualRecordIcon className="c-how-bullet" />
          You'd need MetaMask to be able to interact with the game
          <OpenInNewIcon
            onClick={() =>
              window.open(
                "https://metamask.io/index.html",
                "_blank",
                "noopener noreferrer"
              )
            }
            className="cp"
          />
        </span>
        <span>
          {/* <Icon name="polygon" className="c-how-bullet" />  */}
          <FiberManualRecordIcon className="c-how-bullet" />
          Once you've got that, connect your wallet to Polygon Network{" "}
          <OpenInNewIcon
            onClick={() =>
              window.open(
                "https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask/",
                "_blank",
                "noopener noreferrer"
              )
            }
            className="cp"
          />
        </span>
        <span>
          <FiberManualRecordIcon className="c-how-bullet" />
          Add funds to your wallet using &nbsp;
          <a
            href="https://global.transak.com/"
            target="_blank"
            rel="noreferrer"
          >
            Transak
          </a>
          &nbsp; or exchanges like &nbsp;
          <a href="https://wazirx.com/" target="_blank" rel="noreferrer">
            WazirX
          </a>
          &nbsp;
        </span>
        <span>
          <FiberManualRecordIcon className="c-how-bullet" />
          Well, that's it. Choose a round & predict the right score range and
          multiply your holdings
        </span>
      </div>
      <div className="crycto-how-right">
        {window.ethereum ? (
          <span onClick={connect}>
            Connect <Icon name="metamask" className="c-metamask" />
          </span>
        ) : (
          <span
            onClick={() =>
              window.open(
                "https://metamask.io/download.html",
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
