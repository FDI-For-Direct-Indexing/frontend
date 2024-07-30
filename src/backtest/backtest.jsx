import React, { useEffect, useState } from "react";
import NavbarHeader from "../header/navbarHeader";
import { useParams, useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import "./styles/backtest.css";
import { Col, Row } from "react-bootstrap";
import ComponentsTable from "./components/componentsTable";
import PerformBacktest from "./services/backtest";
import { color } from "d3";

export default function Backtest() {
  const { userId } = useParams();
  const location = useLocation();
  const { selectedItems, startDate, endDate } = location.state || {
    selectedItems: [],
    startDate: new Date(),
    endDate: new Date(),
  };
  const [backtestResult, setBacktestResult] = useState(null);

  useEffect(() => {
    console.log("Received state:", { selectedItems, startDate, endDate });

    const fetchBacktestResult = async () => {
      try {
        const result = await PerformBacktest(selectedItems, startDate, endDate);
        setBacktestResult(result);
      } catch (error) {
        console.error("Error fetching backtest result", error);
      }
    };

    fetchBacktestResult();
  }, [selectedItems, startDate, endDate]);

  // Convert ratios to numbers
  const chartSeries = selectedItems.map((item) => Number(item.ratio));

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: selectedItems.map((item) => item.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const lineChartOptions = {
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
          return val.toFixed(2);
        },
      },
    },
    xaxis: {
      categories: backtestResult ? Object.keys(backtestResult.portfolio.backtest) : [],
      tickAmount: 8,
      labels: {
        rotate: 0,
        hideOverlappingLabels: true,
        formatter: function (value) {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            return date.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
          }
          return value;
        },
      },
    },
    noData: {
      text: "Loading...",
      align: "center",
      verticalAlign: "middle",
    },
  };

  const lineChartSeries = [
    {
      name: "수익률",
      data: backtestResult ? Object.values(backtestResult.portfolio.backtest) : [],
    },
  ];

  return (
    <div className="backtest">
      <NavbarHeader userId={userId} />
      <div className="backtest-container">
        <Row className="backtest-components">
          <Col sm={5} className="left-part">
            <p className="backtest-components-title">다이렉트 인덱싱 구성 종목</p>
            <div className="backtest-components-graph">
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                height={330}
              />
            </div>
            <ComponentsTable selectedItems={selectedItems} userId={userId} />
          </Col>
          <Col sm={6} className="right-part">
            {backtestResult && (
              <div>
                <div className="backtest-title">
                  <p className="backtest-result-title">백테스트 결과</p>
                  <p className="backtest-info">
                    {startDate.toISOString().slice(0, 4)}년 {startDate.toISOString().slice(5, 7)}월
                    마지막 날을 기준으로 하는 상대적 수익률입니다.
                  </p>
                </div>

                <div className="backtest-period">
                  <div className="period-date">
                    <p className="result-date-title">시작 날짜</p>
                    <p className="result-date">{startDate.toISOString().slice(0, 10)}</p>
                  </div>
                  <div className="period-date">
                    <p className="result-date-title">종료 날짜</p>
                    <p className="result-date">{endDate.toISOString().slice(0, 10)}</p>
                  </div>
                </div>
                <ReactApexChart
                  options={lineChartOptions}
                  series={lineChartSeries}
                  type="line"
                  height={330}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
