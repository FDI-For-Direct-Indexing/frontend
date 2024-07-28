import { React, useState } from "react";
import cart from "../../assets/image/cart.svg";
import fullcart from "../../assets/image/full-cart.svg";
import AddCart from "../services/addCart";

export default function ClickCart({ code, userId }) {
  const [isCartFull, setIsCartFull] = useState(false);

  const handleCartClick = async () => {
    await AddCart({ code, userId });
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
