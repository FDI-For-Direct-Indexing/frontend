import React, { useState, useEffect } from "react";
import whitequestionmark from "../../assets/image/white-questionmark.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";

export default function EmotionRate({ code }) {
  const [emotionRate, setEmotionRate] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/api/stocksDetail/${code}`);
        if (response.data) {
          const rate = Math.round(response.data.ogong_rate * 10) / 10;
          setEmotionRate(rate);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [code]);

  return (
    <div className="emotion-rate" style={{ backgroundColor: "#1E5EFF" }}>
      <div>
        <p className="emotion-title">감성지수</p>
        <img className="question-mark" src={whitequestionmark} alt="questionmark" fill="white" />
      </div>
      <div className="progress-bar">
        <CircularProgressbar
          value={emotionRate}
          text={`${emotionRate}`}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            textSize: "20px",
            pathColor: "#FFFFFF",
            textColor: "#FFFFFF",
            trailColor: "rgba(96, 141, 255, 0.7)",
          })}
        />
      </div>
    </div>
  );
}
