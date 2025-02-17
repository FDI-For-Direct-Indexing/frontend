// WeightContext.js
import React, { createContext, useState } from "react";

export const WeightContext = createContext();

export const WeightProvider = ({ children }) => {
  const [sliderValues, setSliderValues] = useState([20, 20, 20, 20, 10, 10]);
  const [stockList, setStockList] = useState([]);
  const [colorList, setColorList] = useState([]);

  const [highest, setHighest] = useState("");
  const [data, setData] = useState([]);

  return (
    <WeightContext.Provider
      value={{
        sliderValues,
        setSliderValues,
        stockList,
        setStockList,
        colorList,
        setColorList,
        highest,
        setHighest,
        data,
        setData
      }}
    >
      {children}
    </WeightContext.Provider>
  );
};
