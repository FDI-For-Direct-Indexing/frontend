import React, { useContext, useEffect } from 'react';
import '../styles/chatsummary.css';
import CHAT from '../../assets/image/chat-symbol.png';
import { CHAT_SAY } from '../../constants/color';
import { WeightContext } from '../../contexts/weightProvider';
import { getIndicatorsResult } from '../services/indicators';

export default function ChatSummary({userId, name}) {
  
  const { sliderValues, setSliderValues } = useContext(WeightContext);
  const rates = [ "안정성", "수익성", "활동성", "성장성", "언급량", "감정지수" ];
  let maxPreference = "";

  useEffect(() => {
    const fetchData = async () => {
      const values = await getIndicatorsResult(userId);
      setSliderValues(values.rates);
    }
    fetchData();
  }, [userId]);

  useEffect(() => { 
    rates.안정성 = sliderValues[0];
    rates.수익성 = sliderValues[1];
    rates.성장성 = sliderValues[2];
    rates.활동성 = sliderValues[3];
    rates.언급량 = sliderValues[4];
    rates.감정지수 = sliderValues[5];

    const maxIdx = sliderValues.reduce((maxIndex, currentValue, currentIndex, array) => {
      return currentValue > array[maxIndex] ? currentIndex : maxIndex;
    }, 0);
    maxPreference = rates[maxIdx];
  }, [sliderValues]);

  return (
    <div className='chatSummaryBallon'>
      <img src={CHAT} alt="chat" width="23" />
      <div style={{marginLeft:'10px'}}>
        <p style={{color:CHAT_SAY, marginBottom:'10px'}}>{name}님에게 적합한 주식 종목 순위를 보여드릴게요. </p>
        <p style={{color:CHAT_SAY}}>
          대화 결과, {name}님은 {maxPreference}이 높은 주식을 선호하는 것 같아요. 만약 다른 결과를 보고싶다면 아래의 슬라이더를 조절하거나 다시 대화를 시작해보세요.
          종목을 클릭하면 자세한 정보를 볼 수 있고, 다이렉트 인덱싱을 위해 장바구니에 담을 수 있어요. 
        </p>
      </div>
    </div>
  )
}
