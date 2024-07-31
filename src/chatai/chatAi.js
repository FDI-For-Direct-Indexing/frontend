import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./chatAi.css";
import fdiImage from "./fdi.jpg"; // FDI 이미지 파일 import
import Email_Send from "./Email_Send.jpg"; // 이메일 전송 아이콘 이미지 파일 import
import profileImage from "../assets/image/chat-symbol.png"; // 새로 만든 귀여운 프로필 이미지 파일 import
import { useLocation } from "react-router-dom";

export default function Chatai() {
  const {state} = useLocation();
  const initialMessages = [

    `안녕하세요 ${state.name}님, AI 다이렉트 인덱싱 서비스 FDI입니다. 당신에게 맞는 종목을 찾을 수 있게 도와드릴게요!`,
    "주식투자를 할 때 어려움 점이 있나요?",

  ];
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: initialMessages[0],
      typing: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [turn, setTurn] = useState(1); // 현재 대화 턴을 추적하는 상태
  const [finalResponse, setFinalResponse] = useState(""); // 네 번째 입력에 대한 응답 저장
  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() !== "" && turn <= 5) {
      setMessages([...messages, { sender: "user", text: input, timestamp: new Date() }]);
      setInput("");
      setLoading(true);

      const requestData = {
        messages: [
          {
            role: "system",
            content:
              '너는 주식투자 가중치 설정을 도와주는 봇이야 수익성, 성장성, 안전성, 활동성, 언급량, 감성지수의 가중치를 바탕으로 종목 선정을 할거야  \r\n\r\n- 총 5번의 멀티턴\r\n- 투자를 하면서 중요하게 생각하는 점 물어보기\r\n- 관심있는 산업 물어보기\r\n- 관심있는 기업 물어보기\r\n- 가중치 지수에 대한 직접적인 언급은 금지\r\n- 가중치는 사용자의 답변에 근거하여 정할 것\r\n- 가중치 지수의 총합은 반드시 1이 될 것\r\n- 5번째 어시스턴트의 대답은 배열 형태로 대괄호 안에 수익성, 성장성, 안전성, 활동성, 언급량, 감성지수 모든 가중치 지수의 수치를 보여주기\r\n- 가중치 지수는 5번째 어시스턴트의 대답에서만 보여줄 것\r\n- 어시스턴트의 대답은 3문장 \r\n\r\n###\n대화예시\n사용자: 저는 요즘 주식이 어려워요\n어시스턴트: 주식에서 어려움을 느끼시는군요. 이런 경우에는 자신만의 기준을 세우고 그에 맞는 종목을 선택하는 것이 중요해요. 어떤 부분을 가장 중요하게 생각하시나요?\n\n사용자: 저는 안전성이 높은 주식이 좋아요\n어시스턴트: 안전성이 높은 주식을 선호하시는군요! 그런 분들을 위해 오랫동안 안정적으로 운영되고 재무상태가 좋은 기업들을 추천해드릴 수 있어요. 혹시 특별히 관심 있는 산업 분야가 있으신가요?\n\n사용자: 식료품 산업에 관심있어요\n어시스턴트: 식료품 산업에 관심이 있으시군요! 식료품 산업은 경기 변동에 영향을 덜 받고 꾸준히 성장하는 산업 중 하나에요. 그럼 이와 관련해서 자주 찾아보시는 기업이 있나요?\n\n사용자: 그런거는 딱히 없어요\n어시스턴트: 특정 기업을 찾지 않고 계시다니 그렇다면 다양한 관점에서 접근할 수 있는 방법을 알려드릴게요. 말씀하신 안전성을 포함하세요 성장가능성이나 요즘 화두가 되는 주식들을 고를 수 있어요\n\n사용자: 요즘 뜨는 주식도 좋아요\n어시스턴트: [수익성: 0.1 성장성: 0.1 안전성: 0.15 활동성: 0.05 언급량: 0.35, 감성지수: 0.25]\n\n\n###\r\n페르소나 : 최근 유행하는 주식과 사람들의 긍정여부를 많이 신경쓰는 사람\r\n가중치 지수: "[수익성: 0.1 성장성: 0.1 안전성: 0.15 활동성: 0.05 언급량: 0.35, 감성지수: 0.25]"\r\n\r\n###\r\n페르소나 : 장기 투자자로 안전성과 오래 들고 갈 수 있는 주식을 선호하는 사람\r\n가중치 지수: "[수익성: 0.2 성장성: 0.15 안전성: 0.35 활동성: 0.1 언급량: 0.1, 감성지수: 0.1]"\r\n\r\n###\r\n페르소나 : 리스크를 감수하더라도 단기적인 수익을 원하는 사람\r\n가중치 지수: "[수익성: 0.3 성장성: 0.3 안전성: 0.05 활동성: 0.15 언급량: 0.1, 감성지수: 0.1]"',
          },
          {
            role: "user",
            content: turn === 5 ? `${input} 가중치 지수를 보여주세요` : input,
          },
        ],
        topP: 0.8,
        topK: 0,
        maxTokens: 256,
        temperature: 0.5,
        repeatPenalty: 5.0,
        stopBefore: [],
        includeAiFilters: true,
        seed: 0,
      };

      try {
        const response = await fetch("http://localhost:8000/ai/execute-completion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const data = await response.json();
          setLoading(false); // 응답이 온 순간 로딩 상태를 false로 설정
          if (data.content) {
            if (turn < 5) {
              addTypingMessage(data.content);
            } else {
              console.log("Final Response (before save):", data.content); // 응답 확인
              await fetch("http://localhost:8000/ai/save-final-response", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ response: data.content }),
              });
              setFinalResponse(data.content); // 최종 응답 설정
              addTypingMessage("답변 감사합니다! 조금만 기다려주세요~");
              setTimeout(() => {
                navigate("/loading", { state: { name: "000" } }); // 리디렉션 및 상태 전달
              }, 2000); // 2초 후에 리디렉션
            }
          } else {
            addTypingMessage("응답을 받지 못했습니다. 다시 시도해주세요.");
          }
          setTurn(turn + 1);
        } else {
          setLoading(false);
          addTypingMessage(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setLoading(false);
        addTypingMessage(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (finalResponse) {
      console.log("Final Response (Updated):", finalResponse); // finalResponse 업데이트 후 출력
    }
  }, [finalResponse]);

  const addTypingMessage = (fullText) => {
    let index = 0;
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: "", typing: true, timestamp: new Date() },
    ]);

    const interval = setInterval(() => {
      index++;
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage.typing) {
          lastMessage.text = fullText.slice(0, index);
        }
        return updatedMessages;
      });
      if (index === fullText.length) {
        clearInterval(interval);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          lastMessage.typing = false;
          return updatedMessages;
        });
      }
    }, 100);
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="App">
      {/* <div className="profile-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="bot-status">봇과 대화 중</div>
      </div> */}
      <img src={fdiImage} alt="FDI" className="chat-image" />
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.sender === "bot" && (
                <img src={profileImage} alt="Profile" className="profile-icon" />
              )}
              {msg.text}
              {/* <div className="timestamp">{formatTimestamp(msg.timestamp)}</div> */}
            </div>
          ))}
          {loading && (
            <div className="chat-message bot loading" id="loading-animation">
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            placeholder="AI가 당신에게 알맞은 주식 종목을 추천해드려요. 대화를 나눠보세요"
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <img src={Email_Send} alt="Send" className="email-send-icon" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
}
