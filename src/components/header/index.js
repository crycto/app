import React from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { useWallet } from "../../providers/WalletProvider";
import logo from "../../assets/logo.png";
import ThemeSwitch from "./ThemeSwitch";
import Icon from "../utils/Icon";

function Header() {
  const { connect, error, account, active, balance } = useWallet();
  return (
    <header className="crycto-topbar">
      <a className="crycto-logo" href="/" title="logo">
        <img src={logo} className="crycto-logo--img" alt="logo" />
        <span className="crycto-logo--text">Crycto</span>
      </a>
      <div className="crycto-launch--block">
        {active ? (
          <AccountInfo account={account} balance={balance} />
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

const AccountInfo = ({ account, balance, onClick, children }) => {
  return (
    <>
      <label className="crycto-launch--cta mr15" onClick={onClick}>
        <Icon name="bat" className="nohover mr10" />
        {maskedAccounAddress(account)}
      </label>
      <label className="crycto-launch--cta mr15">
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
