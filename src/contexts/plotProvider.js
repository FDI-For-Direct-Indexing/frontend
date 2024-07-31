import React, { createContext } from "react";
import { useScatterData } from "../rank/hooks/scatter";

export const PlotContext = createContext();

export const PlotProvider = ({ children }) => {
  const { scatterData, loading, parallelData } = useScatterData();

  return (
    <PlotContext.Provider value={{ scatterData, loading, parallelData }}>
      {children}
    </PlotContext.Provider>
  );
};
