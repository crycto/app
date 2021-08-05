import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import GithubIcon from "@material-ui/icons/GitHub";

function Footer() {
  return (
    <div className="crypto-footer">
      {/* <span className="crypto-footer-follow">FOLLOW US</span> */}
      <div className="crypto-footer-social">
        <span>
          <TwitterIcon fontSize={"medium"} />
          &nbsp;&nbsp; Twitter
        </span>
        <span>
          <InstagramIcon fontSize={"medium"} />
          &nbsp;&nbsp; Instagram
        </span>
        <span>
          <GithubIcon fontSize={"medium"} />
          &nbsp;&nbsp; Github
        </span>
      </div>
      <span>Terms and Service</span>
    </div>
  );
}

export default Footer;
