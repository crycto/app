import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import localStorage from "../localstorage";

const pagination = (keyArgs) => ({
  keyArgs,
  merge(existing, incoming, { args }) {
    const merged = existing ? existing.slice(0) : [];
    if (args) {
      const { skip = 0 } = args;
      for (let i = 0; i < incoming.length; ++i) {
        merged[skip + i] = incoming[i];
      }
    } else {
      throw new Error("Missing args");
    }

    return merged;
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        matches: pagination(["queryId", "connectedUser"]),
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
                fetch(`https://ipfs.infura.io/ipfs/${ipfsHash}`)
                  .then((res) => res.json())
                  .then((m) => {
                    storage[ipfsHash](m);
                    localStorage.setJSON(ipfsHash, m);
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

export default async function initializeClient() {
  //TODO: Need to evaluate need
  // await persistCache({
  //   cache,
  //   storage: new LocalStorageWrapper(window.localStorage),
  // });

  return new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/shrinivas-s/cryctov1",
    cache,
  });
}
