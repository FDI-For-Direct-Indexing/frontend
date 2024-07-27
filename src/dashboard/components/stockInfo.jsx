import { React, useEffect, useState } from "react";
import axios from "axios";
import { connectSocket, joinRoom } from "../services/stockPrice";
import { disconnectSocket, requestCurrentPrice } from "../services/stockPrice";
import questionmark from "../../assets/image/questionmark.svg";
import upicon from "../../assets/image/up-icon.svg";
import downicon from "../../assets/image/down-icon.svg";
import ClickCart from "./clickCart";

export default function StockInfo({ code }) {
  const [name, setName] = useState("");
  const [stockCompare, setStockCompare] = useState(0);
  const [compare, setCompare] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);
  const [color, setColor] = useState("red");

  const handlePrice = (loadedPrice) => {
    setStockPrice(loadedPrice);
  };

  const handleCompare = (loadedCompare) => {
    setStockCompare(loadedCompare);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/api/stocksDetail/${code}`);
        if (response.data) {
          const stockName = response.data.name;
          setName(stockName);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [code]);

  useEffect(() => {
    connectSocket();

    joinRoom(code, handlePrice, handleCompare)
      .then((price) => {
        console.log("Price loaded:", price);
      })
      .catch((error) => {
        console.error("Error joining price room:", error);
      });

    requestCurrentPrice(code, handlePrice, handleCompare);

    return () => {
      disconnectSocket();
    };
  }, [code]);

  useEffect(() => {
    if (stockCompare < 0) {
      setCompare(stockCompare * `-1`);
      setColor("#0029FF");
    } else {
      setCompare(stockCompare);
      setColor("#FF0000");
    }
  }, [stockCompare]);

  return (
    <div className="stock-info">
      <div>
        <div>
          <p className="stock-name">{name}</p>
          <ClickCart />
        </div>
        <img className="question-mark" src={questionmark} alt="questionmark" />
      </div>
      <p className="stock-info-code">{code}</p>
      <p className="stock-price" style={{ color: color }}>
        {stockPrice}
      </p>
      <div className="stock-compare">
        <img
          className="up-down-icon"
          src={color === "#FF0000" ? upicon : downicon}
          alt="up-and-down"
          style={{ width: "15px", height: "15px" }}
        />
        <p className="stock-fluctuation" style={{ color: color }}>
          {stockCompare}
        </p>
      </div>
    </div>
  );
}
