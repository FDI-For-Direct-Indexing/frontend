import React, { createContext, useEffect, useState } from "react";
import { useScatterData } from "../rank/hooks/scatter";

export const PlotContext = createContext();

export const PlotProvider = ({ children }) => {
  const { scatterData, loading } = useScatterData();
  const [parallelData, setParallelData] = useState([]);

  useEffect(() => {
    if (loading === false && scatterData) {
      const tmpPlotData = [];
      console.log("스캐터", scatterData);
      scatterData.forEach((items, index) => {
        items.data.forEach((item) => {
          tmpPlotData.push({ ...item, group: index });
        });
      });

      setParallelData(tmpPlotData);
    }
  }, [scatterData]);

  return (
    <PlotContext.Provider value={{ scatterData, loading, parallelData }}>
      {children}
    </PlotContext.Provider>
  );
};
