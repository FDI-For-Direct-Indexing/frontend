import React, { useState } from "react";
import NavbarHeader from "../header/navbarHeader";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/dashboard.css";
import StockInfo from "./components/stockInfo";
import EmotionRate from "./components/emotionRate";
import MentionAmount from "./components/mentionAmount";
import RelatedNews from "./components/relatedNews";
import RelatedKeywords from "./components/relatedKeywords";
import Indicator from "./components/indicator";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const code = useParams().code;

  const types = ["profit", "stability", "growth", "efficiency"];

  return (
    <div className="dashboard">
      <NavbarHeader />

      <Container className="dashboard-container">
        <Row>
          <Col sm={4} className="left-part">
            <div>
              <StockInfo code={code} />
              <EmotionRate code={code} />
            </div>
            <MentionAmount />
            <RelatedNews code={code} />
          </Col>
          <Col sm={8} className="right-part">
            <RelatedKeywords />
            <div className="indicators">
              <div>
                <Indicator code={code} type={types[0]} />
                <Indicator code={code} type={types[1]} />
              </div>
              <div>
                <Indicator code={code} type={types[2]} />
                <Indicator code={code} type={types[3]} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
