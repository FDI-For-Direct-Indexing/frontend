import React from 'react'
import { NavbarHeader } from '../header/navbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatSummary from './components/chatSummary';
import CartSummary from './components/cartSummary';
import Clustering from './components/clustering';
import Parallel from './components/parallel';
import RankList from './components/weightgraph/rankList';

export default function Rank() {
  return (
    <>
      <NavbarHeader/>
      <Container>
        <Row>
          <Col>
            <div>
              <ChatSummary />
              <CartSummary />
            </div>
          </Col>
          <Col>
            <div>
              <RankList />
              <div>
                <Clustering />
                <Parallel />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
