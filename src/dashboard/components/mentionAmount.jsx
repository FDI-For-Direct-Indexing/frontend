import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import "../styles/mentionAmount.css";

export default function MentionAmount({ name }) {
  const [seriesData, setSeriesData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/api/trend?keywords=${name}`);
        const data = response.data;
        const periods = data.map((item) => item.period);
        const ratios = data.map((item) => item.ratio);

        const transformedPeriods = periods.map((item) => {
          const date = item.split("-");
          return date[1] + "/" + date[2];
        });

        setCategories(transformedPeriods);
        setSeriesData(ratios);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [name]);

  const options = {
    chart: {
      height: 365,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(1);
        },
      },
    },
    xaxis: {
      categories: categories,
      tickAmount: Math.ceil(categories.length / 5),
      labels: {
        rotate: 0,
        hideOverlappingLabels: true,
      },
    },
    noData: {
      text: "Loading...",
      align: "center",
      verticalAlign: "middle",
    },
  };

  const series = [
    {
      name: "언급량",
      data: seriesData,
    },
  ];

  return (
    <div className="mention-amount">
      <div className="mention-header">
        <p className="mention-title">언급량</p>
        <p className="mention-info">
          최근 30일간 네이버에서의 <span style={{ fontWeight: "bold" }}>{name}</span> 검색량
          추이입니다.
        </p>
      </div>
      <div className="linechart">
        <ApexCharts options={options} series={series} type="line" height="400" />
      </div>
    </div>
  );
}
