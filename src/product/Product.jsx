import style from "./css/Product.module.css";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// 메인페이지에 여섯칸으로 들어있는 제품창

function Product() {
  const airconUrl = "/image/aircon.jpg";
  const tvUrl = "/image/tv.jpg";
  const freezerUrl = "/image/freezer.jpg";
  const cookooUrl = "/image/cookoo.jpg";
  const washingUrl = "/image/washing.jpg";
  return (
    <div>
      <div>
        <ul>
          <Link to="/Productlist/C001">
            <li>
              <div className={style.container}>
                <img src={tvUrl} />
              </div>
            </li>
          </Link>

          <Link to="/Productlist/C002">
            <li>
              <div className={style.container}>
                <img src={freezerUrl}></img>
              </div>
            </li>
          </Link>
          <Link to="/Productlist/C003">
            <li>
              <div className={style.container}>
                <img src={washingUrl} />
              </div>
            </li>
          </Link>
          <Link to="/Productlist/C004">
            <li>
              <div className={style.container}>
                <img src={airconUrl} />
              </div>
            </li>
          </Link>
          <Link to="/Productlist/C005">
            <li>
              <div className={style.container}>
                <img src={cookooUrl} />
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Product;
