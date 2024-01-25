import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Productdetail.module.css";

//상품세부 페이지

function Productdetail() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [productData, setProductData] = useState(null);
  const { category, productId } = useParams();
  const [quantity, setQuantity] = useState(1); // 수량 상태를 1로 초기화

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    const getCategoryName = (categoryCode) =>
      ({ C001: "ref", C002: "tv", C003: "wash", C004: "air", C005: "cooker" }[
        categoryCode
      ] || "unknown");

    const url = `/api/category/product?category=${getCategoryName(
      category
    )}&ProductId=${productId}`;

    axios
      .get(url)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [category, productId]);

  // 장바구니에 추가하는 함수
  const addToCart = async () => {
    if (!isLoggedIn) {
      alert("회원만 장바구니 이용이 가능합니다.");
      if (
        window.confirm("수많은 혜택이 기다리고있습니다. 회원가입 하시겠습니까?")
      ) {
        window.location.href = "/signup";
      } else {
        window.location.reload();
      }
    }
    const requestBody = {
      userId: "admin",
      prodId: productId,
      cartCount: quantity,
    };

    try {
      const response = await axios.post("/api/cart/product", requestBody);
      console.log(response.data);
      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  // 상품의 고정된 상세 정보를 표 형태로 렌더링하는 함수
  const renderStaticDetailItemsTable = (product) => (
    <table className={styles["product-specs-table"]}>
      <tbody>
        <tr>
          <th>재고수</th>
          <td>{product.prod_count}</td>
        </tr>
        <tr>
          <th>제조회사</th>
          <td>{product.prod_company}</td>
        </tr>
        <tr>
          <th>출시일자</th>
          <td>{product.prod_date}</td>
        </tr>
        <tr>
          <th>에너지소비효율등급</th>
          <td>{product.prod_energy}</td>
        </tr>
        <tr>
          <th>소비전력</th>
          <td>{product.prod_power}</td>
        </tr>
      </tbody>
    </table>
  );

  // dtls_로 시작하는 속성을 처리하는 함수
  const renderDetailItems = (product) => {
    const detailNames = {
      dtls_id: "제품 ID",
      dtls_ksone: "적합성평가인증",
      dtls_kstwo: "안전확인인증",

      // 일반적인 항목
      dtls_country: "제조국",
      dtls_capacity: "용량",

      // TV 관련 항목
      dtls_screensize: "화면 크기",
      dtls_display: "디스플레이 타입",
      dtls_resolution: "해상도",
      dtls_panel: "패널 타입",
      dtls_fourksr: "4K 지원률",
      dtls_fourkup: "4K 업스케일링",
      dtls_processor: "프로세서",
      dtls_smart: "스마트 기능",
      dtls_dolby: "돌비 지원",
      dtls_hdmi: "HDMI 포트",
      dtls_wifi: "Wi-Fi 지원",
      dtls_lan: "LAN 포트",
      dtls_hdr: "HDR 지원",
      dtls_size: "크기",

      // 에어컨 관련 항목
      dtls_inverter: "인버터",
      dtls_cool: "냉방 기능",
      dtls_sleep: "취침 모드",
      dtls_dehumid: "제습 기능",

      // 세탁기 관련 항목
      dtls_innerqual: "내부 품질",
      dtls_innercot: "내부 코팅",
      dtls_white: "흰색 세탁",
      dtls_mix: "혼합 세탁",
      dtls_twopressure: "이중 압력",
      dtls_switch: "스위치 타입",

      // 기타 제품 관련 항목
      dtls_item: "항목",
    };
    // 상품 상세 정보를 표 형태로 렌더링하는 함수

    const detailRows = Object.keys(product)
      .filter((key) => key.startsWith("dtls_") && product[key])
      .map((key) => (
        <tr key={key}>
          <th>{detailNames[key] || key.replace("dtls_", "").toUpperCase()}</th>
          <td>{product[key]}</td>
        </tr>
      ));
    return (
      <table className={styles["product-specs-table"]}>
        <tbody>{detailRows}</tbody>
      </table>
    );
  };

  // 버튼 클릭 이벤트를 핸들링하는 함수

  const ProductActions = () => {
    return (
      <div className={styles["prod-buy__quantity"]}>
        <div className={styles["prod-quantity__form"]}>
          <div
            className={styles["prod_buytool"]}
            style={{ display: "table-cell", verticalAlign: "top" }}
          >
            <button
              className={styles["prod-quantity__minus"]}
              type="button"
              onClick={handleQuantityDecrease}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              className={styles["prod-quantity__input"]}
              maxLength="6"
              autoComplete="off"
              readOnly
            />
            <button
              className={styles["prod-quantity__plus"]}
              type="button"
              onClick={handleQuantityIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  };

  const buyProdBtn = async () => {
    if (!isLoggedIn) {
      alert("회원만 구매가 가능합니다.");
      if (
        window.confirm("수많은 혜택이 기다리고있습니다. 회원가입 하시겠습니까?")
      ) {
        window.location.href = "/signup";
      } else {
        window.location.reload();
      }
    }
    await axios
      .post("/api/purchase/in-detail", {
        userId: "admin",
        prodId: productId,
        count: quantity,
      })
      .then((response) => {
        if (response.status == 202) {
          alert("성공적으로 구매하셨습니다.");
        }
      })
      .catch((error) => {
        if (error.response.data == "FAIL : NOT SUFFICIENT MONEY")
          alert("돈이 부족합니다.");
      });
  };
  return (
    <div className={styles["product-detail-wrapper"]}>
      {productData &&
        productData.map((product, index) => (
          <div key={index} className={styles.product}>
            <div className={styles["product-image-section"]}>
              <img
                className={styles["product-image"]}
                src={product.prod_img_url}
                alt={product.prod_name}
              />
            </div>
            <div className={styles["product-info-section"]}>
              <h1 className={styles["product-name"]}>{product.prod_name}</h1>
              <p className={styles["product-price"]}>
                {new Intl.NumberFormat("ko-KR").format(product.prod_prc)} 원
              </p>
              <div className={styles["product-specs"]}>
                {/* 상세 정보 목록 */}

                {productData &&
                  productData.map((product) =>
                    renderStaticDetailItemsTable(product)
                  )}

                {/* 상세정보 */}
                {renderDetailItems(product)}
              </div>
            </div>
          </div>
        ))}
      {/* 구매 및 장바구니 버튼 추가 */}
      <div className={styles["product-actions"]}>
        {ProductActions()}
        <button onClick={buyProdBtn} className={styles["buy-button"]}>
          구매하기
        </button>
        <button onClick={addToCart} className={styles["cart-button"]}>
          장바구니에 추가
        </button>
      </div>
    </div>
  );
}

export default Productdetail;
