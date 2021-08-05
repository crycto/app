import { useEffect, useState } from "react";
import Web3 from "web3";

const MORALIS_SPEEDY_NODE = `https://speedy-nodes-nyc.moralis.io/f94984ef1a01656c04c3f764/polygon/mainnet`;
const moralisWeb3 = new Web3(MORALIS_SPEEDY_NODE);

const quickSwapRouter = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
// const wmatic = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
// const usdt = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
const usdtDecimals = 6;
const fetchPrice = async () => {
  const rawPrice = await moralisWeb3.eth.call({
    data: "0xd06ca61f0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f",
    to: quickSwapRouter,
  });
  return parseFloat(rawPrice.toString()) / 10 ** usdtDecimals;
};
export default function useMaticPrice() {
  const [price, setPrice] = useState();

  useEffect(() => {
    fetchPrice().then(setPrice);
    // setInterval(() => {
    //   fetchPrice().then(setPrice);
    // }, 30000);
  }, []);
  return price;
}
