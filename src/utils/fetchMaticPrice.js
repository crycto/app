let lastFetchedPrice = null;
const fetchFromMoralisAPI = async () => {
  try {
    const resp = await fetch(
      `https://deep-index.moralis.io/api/token/ERC20/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270/price?chain=polygon&chain_name=mainnet`,
      {
        headers: {
          "X-API-Key": `nEE063TTAFTbOLkZdoO1zbFrJJWlBEFGS6Di036BznXnrC4DGep5O0wnhjv3sZCm`,
        },
      }
    );
    const { usdPrice } = await resp.json();
    lastFetchedPrice = usdPrice;
  } catch (e) {
    console.log(e);
  }
  return lastFetchedPrice;
};

export default fetchFromMoralisAPI;
