import React, { memo, useCallback } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { chains, NETWORK, TournamentContract } from "../../web3";
import Icon from "../utils/Icon";

const URLS = {
  twitter: "https://www.twitter.com/",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/crycto/",
  polygon: "https://polygon.technology/",
  contract: `https://polygonscan.com/address/${
    TournamentContract[chains[NETWORK].id][1]
  }`,
  terms: "https://crycto.io/terms",
};
function Footer() {
  const goTo = useCallback((name) => {
    window.open(URLS[name], "_blank", "noopener");
  }, []);

  return (
    <div className="crycto-footer">
      <div className="crycto-footer-row1">
        <div className="crycto-footer-copyright">
          Copyright &#169; 2021 Crycto. All Rights Reserved.
        </div>

        <div className="crycto-footer-social">
          <span onClick={goTo.bind(null, "twitter")}>
            <TwitterIcon fontSize="inherit" />
          </span>
          <span onClick={goTo.bind(null, "instagram")}>
            <InstagramIcon fontSize="inherit" />
          </span>
          <span onClick={goTo.bind(null, "linkedin")}>
            <LinkedInIcon fontSize="inherit" />
          </span>
          <span onClick={goTo.bind(null, "github")}>
            <GithubIcon fontSize="inherit" />
          </span>
        </div>

        <div className="crycto-footer-right">
          <div onClick={goTo.bind(null, "contract")}>
            Contract &nbsp;
            <span className="footer-purple">
              {TournamentContract[chains[NETWORK].id][1].substr(0, 8)}...
              <OpenInNewIcon fontSize="inherit" />
            </span>
          </div>
          <div onClick={goTo.bind(null, "polygon")}>
            Built on <Icon name="polygon" className="footer-polygon-img" />
            <span className="footer-purple">Polygon</span>
          </div>

          <span
            onClick={goTo.bind(null, "terms")}
            style={{ marginLeft: "1rem" }}
          >
            Terms of service
          </span>
        </div>
      </div>
      <div className="crycto-footer-row2">
        *This game involves an element of financial risk and can be addictive.
        Using Smart Contracts, Tokens, and Crypto is always a risk. Participate
        with caution.
      </div>
    </div>
  );
}

export default memo(Footer);
