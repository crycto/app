import { InjectedConnector } from "@web3-react/injected-connector";
import { chains } from ".";
export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(chains.MUMBAI), parseInt(chains.MATIC)],
}); //{ supportedChainIds: [chains.MUMBAI,chains.MATIC] }
