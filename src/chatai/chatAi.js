import React, { useState, useEffect, useRef } from "react";
import "./chatAi.css";
import fdiImage from "./fdi.jpg"; // FDI 이미지 파일 import
import Email_Send from "./Email_Send.jpg"; // 이메일 전송 아이콘 이미지 파일 import
import profileImage from "./chat-symbol.png"; // 새로 만든 귀여운 프로필 이미지 파일 import

export default function Chatai({ name }) {
  const initialMessages = [
    `안녕하세요 ${name}님 AI 다이렉트 인덱싱 서비스 FDI입니다. 당신에게 맞는 종목을 찾을 수 있게 도와드릴게요!`,
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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const typingEffect = () => {
      let index = 0;
      const interval = setInterval(() => {
        index++;
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages.length < 2) {
            updatedMessages.push({
              sender: "bot",
              text: initialMessages[1].slice(0, index),
              typing: true,
              timestamp: new Date(),
            });
          } else {
            const lastMessage = updatedMessages[1];
            lastMessage.text = initialMessages[1].slice(0, index);
            updatedMessages[1] = lastMessage;
          }
          return updatedMessages;
        });
        if (index === initialMessages[1].length) {
          clearInterval(interval);
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[1].typing = false;
            return updatedMessages;
          });
        }
      }, 100);
    };
    typingEffect();
  }, []);

  const handleSend = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input, timestamp: new Date() }]);
      setInput("");
      setLoading(true);

      const requestData = {
        messages: [
          {
            role: "system",
            content:
              '너는 주식투자 다이렉트 인덱싱 서비스를 도와주는 봇이야 \r\n\r\n\r\n- 사용자의 질문은 총 4번.\r\n-  최대한 투자에 대해 사용자가 중요하게 생각하는 것들을 얘기할 수 있게 유도해야 돼\r\n- 첫 번째 어시스턴트 대답은 반드시 "주식 투자에서 회사(종목)을 선택할 때 중요하게 생각하는 요소가 있나요?". 이런 뉘양스로 끝내야 해\r\n- 네번째 어시스턴트 대답은 반드시 "알겠습니다! 대화를 바탕으로 인덱싱을 실시할게요 조금만 기다려주세요". 이런 뉘양스로 끝내야 해\r\n- 최대한 예의 바르게 답변해줘\r\n- 대답은 3문장이상 4문장은 넘어가지마\r\n- 대답은 항상 사용자가 했던 말은 한번 짚고 대답해줘',
          },
          { role: "user", content: input },
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
        const response = await fetch("http://localhost:8000/execute-completion", {
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
            addTypingMessage(data.content);
          } else {
            addTypingMessage("응답을 받지 못했습니다. 다시 시도해주세요.");
          }
        } else {
          setLoading(false); // 에러 시에도 로딩 상태를 false로 설정
          addTypingMessage(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setLoading(false); // 에러 시에도 로딩 상태를 false로 설정
        addTypingMessage(`Error: ${error.message}`);
      }
    }
  };

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
    }, 100); // 타이핑 속도를 조절할 수 있습니다.
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
      <div className="profile-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="bot-status">봇과 대화 중</div>
      </div>
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
