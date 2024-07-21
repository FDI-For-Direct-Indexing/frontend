import React from 'react';
import '../styles/chatsummary.css';
import CHAT from '../../assets/image/chat-symbol.svg';
import { CHAT_SAY } from '../../constants/color';

export default function ChatSummary() {
  return (
    <div className='chatSummaryBallon'>
      <img src={CHAT} alt="chat" width="30" />
      <div style={{marginLeft:'10px'}}>
        <p style={{color:CHAT_SAY}}>결과 .... </p>
        <p style={{color:CHAT_SAY}}>당신은....?</p>
      </div>
    </div>
  )
}
