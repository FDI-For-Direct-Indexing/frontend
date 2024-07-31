import React, { useEffect, useState } from "react";
import NavbarHeader from "../header/navbarHeader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatSummary from "./components/chatSummary";
import CartSummary from "./components/cartSummary";
import RankList from "./components/weightgraph/rankList";
import TitleLine from "./components/weightgraph/titleLine";
import CustomGraph from "./components/weightgraph/customGraph";
import { WeightProvider } from "../contexts/weightProvider";
import { PlotProvider } from "../contexts/plotProvider";
import Plots from "./components/plots";
import { useParams } from "react-router-dom";
import { getUsername } from "../header/apis/username";

export default function Rank() {
  const params = useParams();
  const userId = params.userId;

  const [highlightGroupIdx, setHighlightGroupIdx] = useState(null);
  const [username, setUsername] = useState("게스트");

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await getUsername(userId);
      setUsername(name);
    }

    fetchUsername();
  }, [userId]);

  return (
    <div className="pageBack">
      <NavbarHeader userId={userId} />

      <Container style={{ padding: "25px 5vw" }} fluid>
        <WeightProvider initialSliderValues={[30, 25, 15, 20, 10]}>
          <PlotProvider>
            <Row style={{ marginBottom: "25px" }}>
              <Col xs={8}>
                <ChatSummary userId={userId} name={username} />
              </Col>
              <Col xs={4}>
                <CartSummary userId={userId} />
              </Col>
            </Row>
            <Row >
              <Col xs={6}>
                <div className="basicBox" style={{ height: "820px" }}>
                  <CustomGraph title="맞춤형 순위" />
                  <TitleLine />
                  <RankList userId={userId} setGroupIdx={setHighlightGroupIdx} />
                </div>
              </Col>
              <Col xs={6}>
                <Plots highlightGroupIdx={highlightGroupIdx} />
              </Col>
            </Row>
          </PlotProvider>
        </WeightProvider>
      </Container>
    </div>
  );
}
