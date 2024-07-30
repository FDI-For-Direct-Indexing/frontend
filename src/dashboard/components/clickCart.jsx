import React, { useState, useEffect } from "react";
import cart from "../../assets/image/cart.svg";
import fullcart from "../../assets/image/full-cart.svg";
import AddCart from "../services/addCart";
import DeleteCart from "../services/deleteCart";
import { Modal, Button } from "react-bootstrap";

export default function ClickCart({ code, name, userId, isCartFull, setIsCartFull }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCartClick = async () => {
    if (isCartFull) {
      await DeleteCart({ code, userId });
      setModalMessage(`${name}이 장바구니에서 삭제되었습니다.`);
    } else {
      await AddCart({ code, userId });
      setModalMessage(`${name}이 장바구니에 추가되었습니다.`);
    }
    setIsCartFull((prev) => !prev);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <img
        className="stock-cart"
        src={isCartFull ? fullcart : cart}
        alt="cart"
        onClick={handleCartClick}
      />
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>장바구니 알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
