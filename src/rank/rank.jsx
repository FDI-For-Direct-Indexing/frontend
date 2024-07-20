import React from 'react'
import { Header } from '../header/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatSummary from './components/chatSummary';
import CartSummary from './components/cartSummary';
import Clustering from './components/clustering';
import Parallel from './components/parallel';
import RankList from './components/RankList';

export default function Rank() {
  return (
    <>
      <Header/>
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
