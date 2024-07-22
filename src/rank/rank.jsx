import React from 'react'
import NavbarHeader from '../header/navbarHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatSummary from './components/chatsummary';
import CartSummary from './components/cartsummary';
import Clustering from './components/clustering';
import Parallel from './components/parallel';
import RankList from './components/weightgraph/rankList';
import TitleLine from './components/weightgraph/titleline';
import CustomGraph from './components/weightgraph/customGraph';
import { WeightProvider } from '../contexts/weightProvider';
import { PlotProvider } from '../contexts/plotProvider';

export default function Rank() {
  return (
    <div className='pageBack'>
      <NavbarHeader/>
      
      <Container style={{padding:'25px 100px'}} fluid >
        <WeightProvider initialSliderValues={[30, 25, 15, 20, 10]}>
          <PlotProvider>
            <Row>
              <Col xs={8}>
                  <ChatSummary />
              </Col>
              <Col xs={4}>
                  <CartSummary />
              </Col>
            </Row>
            <Row>
              {/* <Col>
                <div>
                  
                  <CustomGraph title="순위" />
                  <TitleLine />
                  <RankList />
                  <div>
                    <Clustering />
                    <Parallel />
                  </div>
                </div>
              </Col> */}
            </Row>
          </PlotProvider>
        </WeightProvider>
      </Container>
    </div>
  )
}
