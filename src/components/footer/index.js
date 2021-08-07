import React, { memo } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import GithubIcon from "@material-ui/icons/GitHub";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { chains, NETWORK, TournamentContract } from "../../web3";
import Icon from "../utils/Icon";
import { useCallback } from "react";

const URLS = {
  twitter: "https://www.twitter.com/",
  instagram: "https://www.instagram.com/",
  github: "https://github.com/crycto/",
  polygon: "https://polygon.technology/",
  contract: `https://polygonscan.com/address/${
    TournamentContract[chains[NETWORK].id][1]
  }`,
};
function Footer() {
  const goTo = useCallback((name) => {
    window.open(URLS[name], "_blank", "noopener");
  }, []);
  return (
    <div className="crypto-footer">
      {/* <span className="crypto-footer-follow">FOLLOW US</span> */}
      <div className="crypto-footer-social">
        <span onClick={goTo.bind(null, "twitter")}>
          <TwitterIcon />
        </span>
        <span onClick={goTo.bind(null, "instagram")}>
          <InstagramIcon />
        </span>
        <span onClick={goTo.bind(null, "github")}>
          <GithubIcon />
        </span>
        <span onClick={goTo.bind(null, "polygon")}>
          Powered by <Icon name="polygon" className="footer-polygon-img" />
          <pre className="footer-purple">Polygon</pre>
        </span>
        <span onClick={goTo.bind(null, "contract")}>
          Tournament Contract &nbsp;
          <pre className="footer-purple">
            {TournamentContract[chains[NETWORK].id][1].substr(0, 8)}...
            <OpenInNewIcon fontSize="small" />
          </pre>
        </span>
      </div>
      <span>Terms and Service</span>
    </div>
  );
}

export default memo(Footer);
