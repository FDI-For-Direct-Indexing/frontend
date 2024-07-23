import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";
import axios from "axios";
import '../../styles/ranklist.css';
import { WeightContext } from "../../../contexts/weightProvider";
import { useNavigate } from "react-router-dom";
import { CLUSTER } from "../../../constants/color";
import { API_URL } from '../../../common/api';
import sectorchip from "../../../common/ui/sectorchip";
import SectionChip from "../../../common/ui/sectionChip";
import { createRoot } from "react-dom/client";

const RankList = () => {
  const { sliderValues, setStockList, colorList } = useContext(WeightContext);
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
        `${API_URL.LOCAL}/api/corporates/list`
        );
        const weightData = response.data;
        setData(weightData);
        const sortedData = rankSort(sliderValues, weightData);
        setData(sortedData);
        setSortedData(sortedData); // sortedData 설정

        const svg = d3
          .select(svgRef.current)
          .attr("width", 750)
          .attr("height", weightData.length * 50 + 50); // 데이터 길이에 따라 높이 조정
        // 군집 색상 바로;

        if (data != undefined && data.length > 0) {
          matchColor().then((d) => {
              console.log(d);
              setData(d);
              update(data, svg, ...sliderValues, "group1");
          });
        }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    };
    
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (data != undefined && data.length > 0) {
      matchColor().then((d) => {
        setData(d);
        const svg = d3
          .select(svgRef.current)
          .attr("width", 750)
          .attr("height", d.length * 50 + 100); // 데이터 길이에 따라 높이 조정
        return update(d, svg, ...sliderValues, "group1");
      });
    }
  }, [colorList]);

  useEffect(() => {
    if (data != undefined && data.length > 0) {
      L_listen(sliderValues, data);
    }
  }, [sliderValues]);

  const matchColor = async () => {
    if (colorList.length > 0) {
      const returnData = await data.map((item) => {
        const colorMatch = colorList.find((color) =>
          color.colorId.includes(item.id)
        );
        if (colorMatch) {
          return {
            ...item,
            color: CLUSTER[colorMatch.id],
          };
        }
        return item; // 기존 item을 그대로 반환
      });
      return returnData;
    }
    return data; //
  };

  const rankSort = (sliderValues, data) => {
    const sortedData = data.sort((a, b) => {
      const colA =
        a.profit * sliderValues[0] +
        a.safety * sliderValues[1] +
        a.growth * sliderValues[2] +
        a.efficiency * sliderValues[3] +
        a.oogong_rate * sliderValues[4];
      const colB =
        b.profit * sliderValues[0] +
        b.safety * sliderValues[1] +
        b.growth * sliderValues[2] +
        b.efficiency * sliderValues[3] +
        b.oogong_rate * sliderValues[4];

      return colB - colA; // 내림차순 정렬
    });

    setStockList(
      sortedData.map((item) => ({
        id: item.id,
        name: item.name,
        sector: item.sector,
        profitability: item.profit * sliderValues[0],
        stability: item.safety * sliderValues[1],
        potential: item.growth * sliderValues[2],
        activity: item.efficiency * sliderValues[3],
        ogoong_rate: item.oogong_rate * sliderValues[4],
      }))
    );
    return sortedData;
  };

  const L_listen = (sliderValues, data) => {
    const svg = d3.select(svgRef.current);
    const sortedData = rankSort(sliderValues, data);
    setData(sortedData);
    setSortedData(sortedData); // sortedData 설정
    update(sortedData, svg, ...sliderValues, "group1");
  };

  const update = async (data, svg, weight_d, weight_s, weight_n, weight_m, weight_q, groupClass ) => {
    if (data === undefined) {
      return;
    }

    let group = svg.select(`.${groupClass}`);
    if (!group.node()) {
      group = svg.append("g").attr("class", groupClass);
    }

    const height = 50;
    const widthScale = 30; // 지수 그래프 너비

    const rows = group.selectAll("g.row").data(data, (d) => d.name);

    // Exit
    rows.exit().remove();

    // Enter
    const rowsEnter = rows
      .enter()
      .append("g")
      .attr("class", "row")
      .attr("transform", (d, i) => `translate(0, ${i * height} + 20)`)
      .on("click", (event, d) => {
        navigate(`/${d.id}`); // 추후 router로 페이지 이동 작성
      })
      .on("mouseenter", function (event, d) {
        d3.select(this).select("rect.background").attr("fill", "#f0f0f0");
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).select("rect.background").attr("fill", "#ffffff");
      });

    rowsEnter
      .append("rect")
      .attr("class", "background")
      .attr("height", height)
      .attr("width", 800)
      .attr("fill", "#ffffff");

    rowsEnter
      .append("line")
      .attr("x1", 0)
      .attr("x2", 800)
      .attr("y1", height - 1)
      .attr("y2", height - 1)
      .attr("stroke", "#000000")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.15); // 투명도 설정

    rowsEnter
      .append("text")
      .attr("class", "index-text")
      .attr("y", 30)
      .attr("font-size", 16)
      .attr("x", 1)
      .attr("font-weight", "bold")
      .text((d, i) => i + 1);

    rowsEnter // 군집색상
      .append("circle")
      .attr("class", "color-type")
      .attr("cx", 55) // x 좌표, rect의 x 속성에서 반지름을 더한 값으로 설정
      .attr("cy", height / 2) // y 좌표, rect의 y와 height를 이용하여 중앙에 위치하도록 설정
      .attr("r", (height - 20) / 2) // 반지름, rect의 height를 사용하여 원의 크기 설정
      .attr("fill", (d) => d.color);

    rowsEnter // 기업명
      .append("text")
      .attr("y", 30)
      .attr("font-size", 16)
      .attr("x", 100)
      .attr("font-weight", "bold")
      .text((d) => (d.id.length > 10 ? `${d.id.slice(0, 10)}...` : d.id));

    rowsEnter // 종목코드?
      .append("text")
      .attr("y", 30)
      .attr("font-size", 16)
      .attr("x", 200)
      .attr("font-weight", "bold")
      .text((d) => (d.name.length > 10 ? `${d.name.slice(0, 10)}...` : d.name));

    // 섹터
    rowsEnter
      .append("colorchip")
      .attr("width", 200)
      .attr("height", height)
      .attr("x", 300)
      .attr("y", 0)
      .each(function(d) {
        const colorObject = this;
        const root = createRoot(colorObject);
        root.render(<SectionChip content={d.name} />);
      });

    rowsEnter
      .append("rect")
      .attr("class", "profit-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("x", 350)
      .attr("fill", "#FF7676")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "safety-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#FFDD87")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "growth-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#91D600")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "efficiency-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#87D4FF")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "oogong-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#C376FF")
      .attr("fill-opacity", 0.7);

    // Update
    const rowsUpdate = rows
      .merge(rowsEnter)
      .transition()
      .duration(1000)
      .attr("transform", (d, i) => `translate(0, ${i * height})`);

    rowsUpdate.select(".index-text").text((d, i) => i + 1);

    rowsUpdate
      .select(".color-type")
      .attr("cx", 55) // x 좌표
      .attr("cy", (d) => height / 2) // y 좌표
      .attr("r", (d) => (height - 20) / 2) // 반지름
      .attr("fill", (d) => d.color);

    rowsUpdate
      .select(".profit-bar")
      .style("width", (d) => (d.profit * weight_d) / widthScale + "px");

    rowsUpdate
      .select(".safety-bar")
      .attr("x", (d) => 350 + (d.profit * weight_d) / widthScale)
      .style("width", (d) => (d.safety * weight_s) / widthScale + "px");

    rowsUpdate
      .select(".growth-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.safety * weight_s) / widthScale
      )
      .style("width", (d) => (d.growth * weight_n) / widthScale + "px");

    rowsUpdate
      .select(".efficiency-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.safety * weight_s) / widthScale +
          (d.growth * weight_n) / widthScale
      )
      .style("width", (d) => (d.efficiency * weight_m) / widthScale + "px");

    rowsUpdate
      .select(".oogong-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.safety * weight_s) / widthScale +
          (d.growth * weight_n) / widthScale +
          (d.efficiency * weight_m) / widthScale
      )
      .style("width", (d) => (d.oogong_rate * weight_q) / widthScale + "px");
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: "50vh" }}>
      <footer>
        <div className="body_right">
          <div className="renderer">
            <svg ref={svgRef}></svg>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RankList;
