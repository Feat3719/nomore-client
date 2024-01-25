import axios from "axios";
import React from "react";
import style from "../BtnStyle.module.css";

export const CartBuyButton = () => {
  const handleBuyClick = async () => {
    try {
      const response = await axios.post("/api/purchase/in-cart", {
        userId: "admin", // 구매자의 사용자 ID
      });
      // 구매 요청이 성공했을 때의 처리
      alert("구매가 완료되었습니다.");
      window.location.href = "./myorder";
    } catch (error) {
      alert("돈이 부족합니다.");
    }
  };

  return (
    <button className={style.Buy} onClick={handleBuyClick}>
      구매하기
    </button>
  );
};
