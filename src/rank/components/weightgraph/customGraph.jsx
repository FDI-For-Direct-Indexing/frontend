import React, { useState, useRef, useContext, useEffect } from "react";
import "../../styles/customgraph.css";
import { WeightContext } from "../../../contexts/weightProvider";
import { INDICATORS, DESCRIPTION } from "../../../constants/color";

function CustomGraph({ title }) {
  const { sliderValues, setSliderValues } = useContext(WeightContext);
  const [sections, setSections] = useState([
    { name: "수익성", color: INDICATORS[0], percentage: sliderValues[0] },
    { name: "안정성", color: INDICATORS[1], percentage: sliderValues[1] },
    { name: "성장성", color: INDICATORS[2], percentage: sliderValues[2] },
    { name: "활동성", color: INDICATORS[3], percentage: sliderValues[3] },
    { name: "언급량", color: INDICATORS[4], percentage: sliderValues[4] },
    { name: "감정지수", color: INDICATORS[5], percentage: sliderValues[5] },
  ]);

  useEffect(() => {
    setSections([
      { name: "수익성", color: INDICATORS[0], percentage: sliderValues[0] },
      { name: "안정성", color: INDICATORS[1], percentage: sliderValues[1] },
      { name: "성장성", color: INDICATORS[2], percentage: sliderValues[2] },
      { name: "활동성", color: INDICATORS[3], percentage: sliderValues[3] },
      { name: "언급량", color: INDICATORS[4], percentage: sliderValues[4] },
      { name: "감정지수", color: INDICATORS[5], percentage: sliderValues[5] },
    ]);
  }, [sliderValues]);

  const graphContainerRef = useRef(null);

  const handleMouseMove = (event, index) => {
    event.preventDefault();
    if (!graphContainerRef.current) {
      return;
    }
    const totalWidth = graphContainerRef.current.offsetWidth;
    const deltaX =
      event.clientX - graphContainerRef.current.getBoundingClientRect().left;

    let sumPercentage = 0;
    for (let i = 0; i < index; i++) {
      sumPercentage += sections[i].percentage;
    }

    let updatedSections = [...sections];
    let currentPercentage =
      Math.round((deltaX / totalWidth) * 100) - sumPercentage;
    let adjustedPercentage = 0;

    if (index < updatedSections.length - 1) {
      const nextIndex = index + 1;
      const currentTotal =
        updatedSections[index].percentage +
        updatedSections[nextIndex].percentage;

      adjustedPercentage = Math.max(
        0,
        Math.min(currentTotal, currentPercentage)
      );

      updatedSections[index].percentage = adjustedPercentage;
      updatedSections[nextIndex].percentage = currentTotal - adjustedPercentage;
    }

    const total = updatedSections.reduce(
      (acc, section) => acc + section.percentage,
      0
    );
    const difference = 100 - total;
    updatedSections[updatedSections.length - 1].percentage += difference;

    setSections(updatedSections);
  };

  const startDrag = (index) => {
    const moveHandler = (event) => {
      handleMouseMove(event, index);
    };

    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
      setSliderValues(sections.map((section) => section.percentage));
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  };

  return (
    <div className="main-body">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
        <p style={{ fontSize: '18px', fontFamily: 'SpoqaHanSansNeo-Bold', textWrap: 'inherit', marginBottom: '5px' }}>{title}</p>
        <p style={{ color: DESCRIPTION, fontSize: '14px', paddingLeft: '10px', marginBottom: '2px' }}>나의 선호에 맞는 종목들은 어떤 게 있을까?</p>
      </div>
      <div className="index-info">
        <div className="index-name">
          <div className="profit">
            <div className="profit-color"></div>
            <p>수익성</p>
          </div>
          <div className="stability">
            <div className="stability-color"></div>
            <p>안정성</p>
          </div>
          <div className="activity">
            <div className="activity-color"></div>
            <p>성장성</p>
          </div>
          <div className="productivity">
            <div className="productivity-color"></div>
            <p>활동성</p>
          </div>
          <div className="mention">
            <div className="mention-color"></div>
            <p>언급량</p>
          </div>
          <div className="sentiment">
            <div className="sentiment-color"></div>
            <p>감정 지수</p>
          </div>
        </div>
      </div>
      <div className="custom-graph" ref={graphContainerRef}>
        {sections.map((section, index) => (
          <div
            key={index}
            className="custom-graph-section"
            style={{
              background: section.color,
              width: `${section.percentage}%`,
              borderRadius: index === 0 ? "10px 0 0 10px" : index === 5 ? "0 10px 10px 0" : "0",
            }}
          >
            <p style={{ margin: 0, fontFamily: 'SpoqaHanSansNeo-Medium' }}>
              {section.percentage.toFixed(0)}%
            </p>
            {index < sections.length - 1 && (
              <div className="handle" onMouseDown={() => startDrag(index)} />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default CustomGraph;