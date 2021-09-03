import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { NETWORK } from "../web3";
import localStorage from "../localstorage";

// const pagination = (keyArgs) => ({
//   keyArgs,
//   merge(existing, incoming, { args }) {
//     const merged = existing ? existing.slice(0) : [];
//     if (args) {
//       const { queryId, skip = 0 } = args;
//       for (let i = 0; i < incoming.length; ++i) {
//         merged[skip + i] = incoming[i];
//       }
//     } else {
//       throw new Error("Missing args");
//     }
//     return merged;
//   },
//   read(existing, { args: { queryId, skip, first } }) {
//     if (queryId == 1) {
//       return existing && existing.slice(skip, skip + first);
//     }
//     return existing;
//   },
// });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // matches: pagination(["queryId", "connectedUser"]),
      },
    },
    Match: {
      fields: {
        matchDetails: {
          read(_, { storage, readField }) {
            const ipfsHash = readField("uri");

            if (!storage[ipfsHash]) {
              storage[ipfsHash] = makeVar({ loading: true });
              if (localStorage.has(ipfsHash)) {
                storage[ipfsHash](localStorage.getJSON(ipfsHash));
              } else {
                fetchFromIpfs(
                  `https://ipfs.infura.io/ipfs`,
                  ipfsHash,
                  storage
                ).catch((e) => {
                  console.log(e);
                  fetchFromIpfs(`https://ipfs.io/ipfs`, ipfsHash, storage);
                });
              }
            }
            return storage[ipfsHash]();
          },
        },
      },
    },
  },
});

const fetchFromIpfs = (url, ipfsHash, storage) =>
  fetch(`${url}/${ipfsHash}`)
    .then((res) => res.json())
    .then((m) => {
      storage[ipfsHash](m);
      localStorage.setJSON(ipfsHash, m);
    });

// const theGraphUrl =
//   "https://api.thegraph.com/subgraphs/name/shrinivas-s/cryctov1";

const testnetSubGraph =
  "https://api.thegraph.com/subgraphs/name/crycto/crycto-mumbai";
const mainnetSubGraph = "https://api.thegraph.com/subgraphs/name/crycto/crycto";

const uri = NETWORK === "MUMBAI" ? testnetSubGraph : mainnetSubGraph;

export default async function initializeClient() {
  return new ApolloClient({
    uri,
    cache,
  });
}
