import React from "react";
import questionmark from "../../assets/image/questionmark.svg";

export default function MentionAmount() {
  return (
    <div className="mention-amount">
      <div>
        <p className="mention-title">언급량</p>
        <img className="question-mark" src={questionmark} alt="questionmark" />
      </div>
    </div>
  );
}
