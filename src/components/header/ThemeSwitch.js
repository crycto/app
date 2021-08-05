import React from "react";
import night from "../../assets/night.svg";
import sun from "../../assets/sun.svg";
import { useTheme } from "../../providers/ThemeProvider";

function ThemeSwitch() {
  const { isLightTheme, switchTheme } = useTheme();
  return (
    <div
      className={`crycto-launch--cta _moon ${!isLightTheme && "_sun"}`}
      onClick={switchTheme}
    >
      {isLightTheme ? (
        <img src={night} className="moon-image" alt="dark" />
      ) : (
        <img src={sun} className="sun-image" alt="light" />
      )}
    </div>
  );
}

export default ThemeSwitch;
