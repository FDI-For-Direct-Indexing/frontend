import React from "react";
import questionmark from "../../assets/image/questionmark.svg";

export default function RelatedKeywords() {
  return (
    <div className="related-keywords">
      <div>
        <p className="keywords-title">관련 키워드</p>
        <img className="question-mark" src={questionmark} alt="questionmark" />
      </div>
    </div>
  );
}
