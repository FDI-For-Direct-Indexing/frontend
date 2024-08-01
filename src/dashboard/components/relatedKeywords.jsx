import React from "react";
import questionmark from "../../assets/image/questionmark.svg";
import WordCloud from "./workCloud";

export default function RelatedKeywords({ name }) {
  return (
    <div className="related-keywords">
      <div>
        <p className="keywords-title">관련 키워드</p>
        <WordCloud stockName={name} />
        <img className="question-mark" src={questionmark} alt="questionmark" />
      </div>
    </div>
  );
}
