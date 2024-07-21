// WeightContext.js
import React, { createContext, useState } from "react";

export const WeightContext = createContext();

export const WeightProvider = ({ children }) => {
  const [sliderValues, setSliderValues] = useState([20, 20, 20, 20, 20]);
  const [stockList, setStockList] = useState([]);
  const [colorList, setColorList] = useState([]);
  
  return (
    <WeightContext.Provider
      value={{
        sliderValues,
        setSliderValues,
        stockList,
        setStockList,
        colorList,
        setColorList,
      }}
    >
      {children}
    </WeightContext.Provider>
  );
};
