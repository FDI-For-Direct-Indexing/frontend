import React, { useEffect, useState } from "react";
import axios from "axios";
import questionmark from "../../assets/image/questionmark.svg";
import GetNews from "../services/newsCrawling";
import "../styles/relatedNews.css";
import { API_URL } from "../../common/api";

export default function RelatedNews({ code }) {
  const [newsList, setNewsList] = useState([]);
  let today = new Date();
  today = today.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL.LOCAL}/api/stocksDetail/${code}`);
        const stockName = response.data.name;
        const news = await GetNews(stockName);
        setNewsList(news);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [code]);

  return (
    <div className="related-news">
      <div className="related-news-header">
        <p className="related-news-title">관련 기사</p>
        <p className="news-info">{today} 기준 집계된 데이터입니다.</p>
      </div>
      <div className="news-list">
        <table>
          <thead>
            <tr>
              <th className="news-company">신문사</th>
              <th className="news-title">기사 제목</th>
              <th className="news-date">날짜</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.title}>
                <td>{news.press}</td>
                <td className="news-title-content">
                  <a href={news.url} target="_blank" rel="noreferrer">
                    {news.title}
                  </a>
                </td>
                <td className="news-date-content">{news.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
