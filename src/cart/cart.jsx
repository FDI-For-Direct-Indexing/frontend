import React from "react";
import NavbarHeader from "../header/navbarHeader";
import "./styles/cart.css";
import DiList from "./components/diList";
import { useParams } from "react-router-dom";

export default function Cart() {
  const { userId } = useParams();

  return (
    <div className="cart-component">
      <NavbarHeader />
      <div className="cart-container">
        <p className="cart-title">다이렉트 인덱싱 장바구니</p>
        <div className="cart-list">
          <div>
            <DiList userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
