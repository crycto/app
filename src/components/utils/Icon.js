import React from "react";
import polygon from "../../assets/polygon.svg";
import bat from "../../assets/bat.svg";
import moneybag from "../../assets/moneybag.svg";
import arrow from "../../assets/arrow.svg";

function Icon({ name, className, onClick }) {
  switch (name) {
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
    default:
      return null;
  }
}

export default Icon;
