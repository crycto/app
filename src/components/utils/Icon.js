import React from "react";
import logo from "../../assets/logo.png";
import polygon from "../../assets/polygon.svg";
import bannerPlayer from "../../assets/banner-player.svg";
import bat from "../../assets/bat.svg";
import moneybag from "../../assets/moneybag.svg";
import arrow from "../../assets/arrow3.svg";
import arrowDark from "../../assets/arrow-dark.svg";
import trophy from "../../assets/trophy1.svg";
import stars from "../../assets/stars.svg";
import metamask from "../../assets/metamask.svg";
import noresults from "../../assets/noresults.png";
import { useTheme } from "../../providers/ThemeProvider";

function Icon({ name, className, onClick }) {
  const { isLightTheme } = useTheme();
  switch (name) {
    case "logo":
      return (
        <img src={logo} className={className} alt="logo" onClick={onClick} />
      );
    case "polygon":
      return (
        <img
          src={polygon}
          className={className}
          alt="polygon"
          onClick={onClick}
        />
      );
    case "bat":
      return (
        <img src={bat} className={className} alt="bat" onClick={onClick} />
      );
    case "moneybag":
      return (
        <img src={moneybag} className={className} alt="$" onClick={onClick} />
      );
    case "arrow":
      return (
        <img
          src={isLightTheme ? arrow : arrowDark}
          className={className}
          alt="arrow"
          onClick={onClick}
        />
      );
    case "trophy":
      return (
        <img
          src={trophy}
          className={className}
          alt="trophy"
          onClick={onClick}
        />
      );
    case "bannerPlayer":
      return (
        <img
          src={bannerPlayer}
          className={className}
          alt=""
          onClick={onClick}
        />
      );
    case "stars":
      return (
        <img src={stars} className={className} alt="stars" onClick={onClick} />
      );
    case "metamask":
      return (
        <img
          src={metamask}
          className={className}
          alt="metamask"
          onClick={onClick}
        />
      );
    case "noresults":
      return (
        <img
          src={noresults}
          className={className}
          alt="noresults"
          onClick={onClick}
        />
      );
    default:
      return null;
  }
}

export default Icon;
