import React from "react";
import "../../styles/titleline.css";

export default function TitleLine() {
  return (
    <div className="titleline-container">
      <span className="titleline">
        <div>
          <span className="rank">순위</span>
          <span className="group">그룹</span>
          <span className="stock-code">종목코드</span>
          <span className="sector">섹터</span>
          <span className="company-name">기업명</span>
        </div>
        <span className="titleline-item graph">그래프</span>
        {/* <span className="titleline-item cart">담기</span> */}
      </span>
      <hr className="separator-line" style={{ borderColor: "#5A607F" }} />
    </div>
  );
}
