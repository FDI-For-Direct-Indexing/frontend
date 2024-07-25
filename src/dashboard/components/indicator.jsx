import { React, useState, useEffect } from "react";
import questionmark from "../../assets/image/questionmark.svg";
import ApexCharts from "react-apexcharts";
import axios from "axios";

export default function Indicator({ code, type }) {
  const [data, setData] = useState({ categories: [], rates: [] });

  const titles = ["수익성", "안정성", "성장성", "성장성"];
  let title = titles[0];
  if (type === "profit") title = titles[0];
  else if (type === "stability") title = titles[1];
  else if (type === "growth") title = titles[2];
  else if (type === "efficiency") title = titles[3];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/api/stocksDetail/${code}`);
        if (response.data[type]) {
          const categories = response.data[type].map((item) => item.matrix);
          const rates = response.data[type].map((item) => parseFloat(item.rates));
          setData({ categories, rates });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [code, type]);

  return (
    <div className="indicator">
      <div>
        <p className="indicator-title">{title} 지표</p>
        <img className="question-mark" src={questionmark} alt="questionmark" />
      </div>
      <ApexCharts
        type="bar"
        series={[{ name: "비율", data: data.rates }]}
        options={{
          theme: { mode: "light" },
          chart: {
            height: 300,
            width: 500,
            toolbar: { show: false },
            background: "transparent",
          },
          grid: { show: true },
          yaxis: { show: true },
          xaxis: {
            labels: { show: true },
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: data.categories,
            type: "string",
          },
          colors: ["#1FD286"],
          tooltip: {
            y: { formatter: (value) => `${value.toFixed(2)}%` },
          },
        }}
      />
    </div>
  );
}
