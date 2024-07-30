import React, { useState } from 'react'
import NavbarHeader from '../header/navbarHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatSummary from './components/chatSummary';
import CartSummary from './components/cartSummary';
import RankList from './components/weightgraph/rankList';
import TitleLine from './components/weightgraph/titleLine';
import CustomGraph from './components/weightgraph/customGraph';
import { WeightProvider } from '../contexts/weightProvider';
import { PlotProvider } from '../contexts/plotProvider';
import { useParams } from 'react-router-dom';
import Plots from './components/plots';

export default function Rank() {

  const params = useParams();

  const [highlightGroupIdx, setHighlightGroupIdx] = useState(null);

  return (
    <div className='pageBack'>
      <NavbarHeader userId={params.userId} />

      <Container style={{ padding: "25px 5vw" }} fluid>
        <WeightProvider initialSliderValues={[30, 25, 15, 20, 10]}>
          <PlotProvider>
            <Row style={{ marginBottom: "25px" }}>
              <Col xs={8}>
                <ChatSummary />
              </Col>
              <Col xs={4}>
                <CartSummary userId={params.userId} />
              </Col>
            </Row>
            <Row >
              <Col xs={6}>
                <div className="basicBox" style={{ height: "820px" }}>
                  <CustomGraph title="맞춤형 순위" />
                  <TitleLine />
                  <RankList userId={params.userId} setGroupIdx={setHighlightGroupIdx} />
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
