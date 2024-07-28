import { React, useState } from "react";
import cart from "../../assets/image/cart.svg";
import fullcart from "../../assets/image/full-cart.svg";

export default function ClickCart() {
  const [isCartFull, setIsCartFull] = useState(false);

  const handleCartClick = () => {
    setIsCartFull((prev) => !prev);
  };
  return (
    <img
      className="stock-cart"
      src={isCartFull ? fullcart : cart}
      alt="cart"
      onClick={handleCartClick}
    />
  );
}
