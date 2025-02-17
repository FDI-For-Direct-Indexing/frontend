import React, { useContext, useEffect, useState } from "react";
import "../styles/chatsummary.css";
import CHAT from "../../assets/image/chat-symbol.png";
import { CHAT_SAY } from "../../constants/color";
import { WeightContext } from "../../contexts/weightProvider";
import { getIndicatorsResult } from "../services/indicators";

export default function ChatSummary({ userId, name }) {
  const { sliderValues, setSliderValues, highest } = useContext(WeightContext);

  return (
    <div className="chatSummaryBallon">
      <img src={CHAT} alt="chat" width="23" />
      <div style={{ marginLeft: "10px" }}>
        <p style={{ color: CHAT_SAY, marginBottom: "10px" }}>
          {name}님에게 적합한 주식 종목 순위를 보여드릴게요.{" "}
        </p>
        <p style={{ color: CHAT_SAY }}>
          대화 결과, {name}님은 {highest}이 높은 주식을 선호하는 것 같아요. 만약 다른 결과를
          보고싶다면 아래의 슬라이더를 조절하거나 다시 대화를 시작해보세요. 종목을 클릭하면 자세한
          정보를 볼 수 있고, 다이렉트 인덱싱을 위해 장바구니에 담을 수 있어요.
        </p>
      </div>
    </div>
  );
}
