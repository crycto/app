import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
function TopBanner() {
  const [show, setShow] = useState(true);
  return (
    show && (
      <div className="crycto-top-banner">
        This site runs on Mumbai Testnet. Connect your MetaMask wallet to &nbsp;
        <a
          href="https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask/"
          target="_blank"
          rel="noreferrer"
        >
          Mumbai Testnet
        </a>
        . You can get free MATIC from&nbsp;
        <a
          href="https://faucet.matic.network/"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        &nbsp; to test the gameplay.&nbsp;&nbsp;
        <label href="javascript;;" onClick={() => setShow(false)}>
          Hide
        </label>
      </div>
    )
  );
}

export default TopBanner;
