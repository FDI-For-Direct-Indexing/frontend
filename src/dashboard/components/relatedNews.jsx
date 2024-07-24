import React, { useEffect, useState } from "react";
import axios from "axios";
import questionmark from "../../assets/image/questionmark.svg";
import GetNews from "../services/newsCrawling";
import { Table } from "react-bootstrap";

export default function RelatedNews({ code }) {
  const [newsList, setNewsList] = useState([]);
  let today = new Date();
  today = today.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/api/stocksDetail/${code}`);
        const stockName = response.data.name;
        const news = await GetNews(stockName);
        console.log(news);
        setNewsList(news);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [code]);

  return (
    <div className="related-news">
      <div>
        <div>
          <p className="news-title">관련 기사</p>
          <p className="news-info">{today} 기준 집계된 데이터입니다.</p>
        </div>
        <img className="question-mark" src={questionmark} alt="questionmark" />
      </div>
      <div className="news-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>신문사</th>
              <th>기사 제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.title}>
                <td>{news.press}</td>
                <td>
                  <a href={news.link} target="_blank" rel="noreferrer">
                    {news.title}
                  </a>
                </td>
                <td>{news.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
