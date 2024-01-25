import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Nav from "../navigation/Nav";
import style from "./css/Cart.module.css";
import CartList from "./CartList";
import axios from "axios";
import TotalPrice from "./TotalPrice";
import { CartBuyButton } from "./CartBuyButton";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart/products", {
          params: {
            userId: "admin", // 현재 사용자 ID로 설정
          },
        });
        setCartItems(response.data); // 응답 데이터를 cartItems 상태로 설정
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);
  const updateCartItem = (updatedItem) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.prodId === updatedItem.prodId ? updatedItem : item
      )
    );
  };

  return (
    <>
      <Nav />
      <Header />
      <div className={style.base}>
        <div className={style.background}>
          <div className={style.main_area}>
            <div className={style.cart_list_area}>
              <ul className={style.cart_list}>
                {cartItems.map((item) => (
                  <CartList
                    key={item.prodId}
                    item={item}
                    style={style}
                    onUpdate={updateCartItem}
                  />
                ))}
              </ul>
              <TotalPrice style={style} data={cartItems} />
            </div>
            <CartBuyButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
