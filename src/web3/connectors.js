import { InjectedConnector } from "@web3-react/injected-connector";
import { chains, NETWORK } from ".";
export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(chains[NETWORK].id)],
});
