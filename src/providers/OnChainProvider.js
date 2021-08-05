import React, { createContext, useContext } from "react";
import useMaticPrice from "../hooks/useMaticPrice";

const OnChainContext = createContext({});

function OnChainProvider({ children }) {
  const price = useMaticPrice();
  return (
    <OnChainContext.Provider value={{ price }}>
      {children}
    </OnChainContext.Provider>
  );
}

export const useOnChainContext = () => useContext(OnChainContext);

export default OnChainProvider;
