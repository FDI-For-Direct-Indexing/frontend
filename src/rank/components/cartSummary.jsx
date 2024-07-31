import React, { useEffect, useState } from "react";
import { DESCRIPTION } from "../../constants/color";
import { getRecentCart } from "../services/cart";

export default function CartSummary({ userId }) {
  const [recentCart, setRecentCart] = useState([]);

  useEffect(() => {
    getRecentCart(userId)
      .then((res) => {
        setRecentCart(res);
      })
      .catch((error) => {
        console.error("Error fetching recent cart data:", error);
      });
  }, [userId]);

  return (
    <div className="basicBox" style={{ height: "15vh" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <p
          style={{
            fontSize: "18px",
            fontFamily: "SpoqaHanSansNeo-Bold",
            textWrap: "inherit",
            marginBottom: "5px",
          }}
        >
          다이렉트 인덱싱
        </p>
        <p
          style={{ color: DESCRIPTION, fontSize: "14px", paddingLeft: "10px", marginBottom: "2px" }}
        >
          최근에 담은 종목
        </p>
      </div>
      <div style={{ height: "auto" }}>
        {recentCart.length !== 0 ? (
          recentCart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "space-between",
                padding: "10px 10px 0px 10px",
              }}
            >
              <p style={{ fontSize: "16px", margin: "0px" }}>{item.name}</p>
              <p style={{ fontSize: "16px", margin: "0px" }}>{item.price}원</p>
            </div>
          ))
        ) : (
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontSize: "16px", margin: "0px" }}>장바구니가 비어있습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
