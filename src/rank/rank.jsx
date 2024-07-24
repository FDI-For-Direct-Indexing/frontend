import React from 'react'
import NavbarHeader from '../header/navbarHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatSummary from './components/chatsummary';
import CartSummary from './components/cartsummary';
import Clustering from './components/clustering';
import Parallel from './components/parallelPlot/parallel';
import RankList from './components/weightgraph/rankList';
import TitleLine from './components/weightgraph/titleline';
import CustomGraph from './components/weightgraph/customGraph';
import { WeightProvider } from '../contexts/weightProvider';
import { PlotProvider } from '../contexts/plotProvider';

export default function Rank() {
  return (
    <div className='pageBack'>
      <NavbarHeader />

      <Container style={{ padding: '25px 100px' }} fluid >
        <WeightProvider initialSliderValues={[30, 25, 15, 20, 10]}>
          <PlotProvider>
            <Row style={{ marginBottom: '25px' }}>
              <Col xs={8}>
                <ChatSummary />
              </Col>
              <Col xs={4}>
                <CartSummary />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <div className='basicBox'>
                  <CustomGraph title="맞춤형 순위" />
                  <TitleLine />
                  <RankList />
                </div>
              </Col>
              <Col xs={6}>
                <Clustering />
                <Parallel />
              </Col>
            </Row>
          </PlotProvider>
        </WeightProvider>
      </Container>
    </div>
  )
}
