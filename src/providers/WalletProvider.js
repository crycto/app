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
import AlertMsg from "../components/utils/AlertMsg";

function getLibrary(provider) {
  const library = new Web3(provider);
  library.pollingInterval = 1 * 60 * 60; //1 minute
  return library;
}

const WalletContext = createContext({});

function WalletContextProvider({ children }) {
  const [balance, setBalance] = useState();
  const [showMetaMaskMissingError, setShowMetaMaskMissingError] =
    useState(false);
  const [showNetworkError, setShowNetworkError] = useState(false);
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
    if (error?.code === 4001) {
      //User rejected action in metamask
      return;
    }
    // console.log(error); For Testing
    if (error.name === "UnsupportedChainIdError") {
      switchNetwork().catch((e) => {
        if (e?.code === 4001) {
          //User rejected action in metamask
          return;
        }

        setShowNetworkError(true);
      });
    } else if (error.name === "NoEthereumProviderError") {
      setShowMetaMaskMissingError(true);
      console.log(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    } else {
      console.log(error);
    }
  }, [error]);

  return (
    <WalletContext.Provider
      value={{ ...context, triedEager, connect, balance }}
    >
      {showMetaMaskMissingError && (
        <AlertMsg
          severity="error"
          title={"MetaMask is not installed"}
          link="https://metamask.io/download.html"
          linkText="Install Metamask"
          onClose={() => setShowMetaMaskMissingError(false)}
        />
      )}
      {showNetworkError && (
        <AlertMsg
          severity="warning"
          title={"Connect to Polygon network"}
          link="https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask/"
          linkText="Configure Polygon on your wallet"
          onClose={() => setShowNetworkError(false)}
        />
      )}
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
