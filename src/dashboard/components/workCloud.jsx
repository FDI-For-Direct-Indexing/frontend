import React, { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import axios from "axios";
import { API_URL } from "../../common/api";

export default function WordCloudComponent({ stockName }) {
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL.LOCAL}/api/associate?keywords=${stockName}`);
        if (response.data) {
          const formattedData = response.data.map((keyword) => ({
            text: keyword.label,
            value: keyword.frequency,
          }));
          if (formattedData.length === 0) {
            setErrorMessage(
              `관련 키워드를 분석하기에 ${stockName}에 대한 데이터가 충분하지 않습니다.`,
            );
          } else {
            setRelatedKeywords(formattedData);
            setErrorMessage("");
          }
        } else {
          setErrorMessage(
            `관련 키워드를 분석하기에 ${stockName}에 대한 데이터가 충분하지 않습니다.`,
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setErrorMessage(`관련 키워드를 분석하기에 ${stockName}에 대한 데이터가 충분하지 않습니다.`);
      }
    }

    fetchData();
  }, [stockName]);

  const rotate = (word) => (Math.random() > 0.5 ? 90 : 0);

  return (
    <div className="wordcloud-container" style={{ width: "300px", height: "300px" }}>
      {errorMessage ? (
        <p className="wordcloud-error">{errorMessage}</p>
      ) : (
        <WordCloud
          data={relatedKeywords}
          rotate={rotate}
          fontSize={(word) => Math.log2(word.value) * 5}
          spiral="archimedean"
          width={300}
          height={300}
          font="SpoqaHanSansNeo-Bold"
        />
      )}
    </div>
  );
}
