import React, { useState } from "react";

import { useWallet } from "../../providers/WalletProvider";
import logo from "../../assets/logo.png";
import ThemeSwitch from "./ThemeSwitch";
import Icon from "../utils/Icon";
import { ClickAwayListener } from "@material-ui/core";
import { NETWORK } from "../../web3";

function Header() {
  const { connect, account, active, deactivate, balance } = useWallet();

  return (
    <header className="crycto-topbar">
      <div className="crycto-logo">
        <a href="/">
          <img src={logo} className="crycto-logo--img" alt="logo" />
          <span className="crycto-logo--text">Crycto</span>
          <label>Beta</label>
        </a>
      </div>

      <div className="crycto-launch--block">
        {NETWORK === "MUMBAI" && (
          <label
            className="crycto-launch--cta getmatic mr15"
            onClick={() =>
              window.open(
                "https://faucet.matic.network/",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            Get Test MATIC !
          </label>
        )}
        {active ? (
          <AccountInfo
            account={account}
            balance={balance}
            deactivate={deactivate}
          />
        ) : (
          <Connect onClick={connect} />
        )}
        <ThemeSwitch />
      </div>
    </header>
  );
}

const maskedAccounAddress = (address) =>
  address &&
  `${address.substr(0, 6)}....${address.substr(address.length - 4, 4)}`;

const AccountInfo = ({ account, balance, deactivate }) => {
  const [focussed, setFocussed] = useState(false);

  const handleClick = (event) => {
    setFocussed((f) => !f);
  };
  const handleClose = () => {
    setFocussed(false);
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <label
          className={`crycto-launch--cta mr15 ${focussed && "crycto-account"}`}
          onClick={handleClick}
        >
          <Icon name="bat" className="nohover mr10" />
          {maskedAccounAddress(account)}
          {focussed && (
            <div className="crycto-disconnect" onClick={deactivate}>
              Disconnect
            </div>
          )}
        </label>
      </ClickAwayListener>
      <label className="crycto-launch--cta balance mr15">
        <Icon name="polygon" className="nohover mr10" />
        {balance ?? 0.0}
      </label>
    </>
  );
};

const Connect = ({ icon, onClick, children }) => {
  return (
    <label className="crycto-launch--cta mr15" onClick={onClick}>
      Connect Wallet
    </label>
  );
};

export default Header;
