import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useEagerConnect, useInactiveListener } from "../hooks/useEagerConnect";
import Web3 from "web3";
import { injected } from "../web3/connectors";
import { switchNetwork, TournamentContract } from "../web3";

function getLibrary(provider) {
  const library = new Web3(provider);
  library.pollingInterval = 1 * 60 * 60; //1 minute
  return library;
}

const WalletContext = createContext({});

function WalletContextProvider({ children }) {
  const [balance, setBalance] = useState();
  const context = useWeb3React();
  const { library, account, activate, error } = context;

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  window.web3 = library; //For Testing

  const fetchBalance = useCallback(() => {
    if (!account || !library) {
      return;
    }

    library.eth
      .getBalance(account)
      .then((b) => setBalance(parseFloat(b.toString() / 1e18).toFixed(2)));
  }, [library, account]);
  useEffect(() => {
    fetchBalance();
    const _iid = setInterval(fetchBalance, 15 * 1000);
    return () => clearInterval(_iid);
  }, [fetchBalance]);

  const connect = useCallback(
    () => activate(injected).catch((e) => console.log(e)),
    [activate]
  );

  useEffect(() => {
    if (!error) {
      return;
    }
    console.log(error); //For Testing
    if (error.name === "UnsupportedChainIdError") {
      switchNetwork().catch(console.log);
    } else if (error.name === "NoEthereumProviderError") {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    } else {
      alert(JSON.stringify(error)); //For testing - Need to change it to console.log
    }
  }, [error]);

  return (
    <WalletContext.Provider
      value={{ ...context, triedEager, connect, balance }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export default function Web3Provider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletContextProvider>{children}</WalletContextProvider>
    </Web3ReactProvider>
  );
}

export const useWallet = () => useContext(WalletContext);

export const useTournamentContract = () => {
  const { library, chainId } = useContext(WalletContext);
  return library
    ? new library.eth.Contract(
        ...TournamentContract["0x" + chainId.toString(16)]
      )
    : null;
};
