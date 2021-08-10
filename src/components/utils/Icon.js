import React from "react";
import logo from "../../assets/logo.png";
import polygon from "../../assets/polygon.svg";
import bat from "../../assets/bat.svg";
import moneybag from "../../assets/moneybag.svg";
import arrow from "../../assets/arrow.svg";
import trophy from "../../assets/trophy.svg";
import stars from "../../assets/stars.svg";
import metamask from "../../assets/metamask.svg";

function Icon({ name, className, onClick }) {
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
        <img src={arrow} className={className} alt="arrow" onClick={onClick} />
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
    default:
      return null;
  }
}

export default Icon;
