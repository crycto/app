import Web3 from "web3";
import TournamentV1 from "./abis/TournamentV1.json";
export const chains = {
  MUMBAI: "0x13881",
  MATIC: "0x89",
};

export const TournamentContract = {
  [chains.MUMBAI]: [
    TournamentV1.abi,
    "0x3A897FAdA04EB55C6F78635f6e3086aA7192025b",
  ],
  [chains.MATIC]: null,
};

export const switchNetwork = async () => {
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chains.MUMBAI }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chains.MUMBAI,
                rpcUrl: "https://rpc-mainnet.maticvigil.com/",
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};

const MORALIS_SPEEDY_NODE = `https://speedy-nodes-nyc.moralis.io/f94984ef1a01656c04c3f764/polygon/mainnet`;

export const moralisWeb3 = new Web3(MORALIS_SPEEDY_NODE);
