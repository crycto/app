import Web3 from "web3";
import TournamentV1 from "./abis/TournamentV1.json";
export const chains = {
  MUMBAI: {
    id: "0x13881",
    networkObject: {
      chainId: "0x13881",
      chainName: "Mumbai Testnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    },
  },
  MATIC: {
    id: "0x89",
    networkObject: {
      chainId: "0x89",
      chainName: "Matic Mainnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
    },
  },
};

export const NETWORK =
  window.location.host?.indexOf("localhost") !== -1 ? "MUMBAI" : "MATIC";

console.log(NETWORK);
export const TournamentContract = {
  [chains.MUMBAI.id]: [
    TournamentV1.abi,
    "0x3A897FAdA04EB55C6F78635f6e3086aA7192025b",
  ],
  [chains.MATIC.id]: [TournamentV1.abi, ""],
};

export const switchNetwork = async () => {
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chains[NETWORK].id }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902 || error.code === -32603) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chains[NETWORK].networkObject],
          });
        } catch (addError) {
          throw addError;
        }
      } else {
        throw error;
      }
      console.log(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    console.log(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};

const MORALIS_SPEEDY_NODE = `https://speedy-nodes-nyc.moralis.io/f94984ef1a01656c04c3f764/polygon/mainnet`;

export const moralisWeb3 = new Web3(MORALIS_SPEEDY_NODE);
