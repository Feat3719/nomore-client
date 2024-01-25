function TotalPrice({ style, data }) {
  const shipping = 0; // 배송료(임시)

  const calculateTotalPrice = () => {
    return data.reduce(
      (total, item) => total + item.prodPrc * item.cartCount,
      0
    );
  };

  const totalPrice = calculateTotalPrice() + shipping;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "decimal",
      currency: "KRW",
    }).format(price);
  };

  return (
    <>
      <div className={style.total_price}>
        <div className={style.total_title_bgr}></div>
        <div className={style.total_title}>주문하기</div>
        <div className={style.total_detail_area}>
          <div className={style.total_prod_price}>
            <div>구매 제품 금액</div>
            <div>{formatPrice(totalPrice - shipping)}원</div>
          </div>
          <div className={style.total_plus}>+</div>
          <div className={style.total_shipping}>
            <div>배송비</div>
            <div>{formatPrice(shipping)}원</div>
          </div>
          <div className={style.total_plus}>+</div>
          <div className={style.total_real_price}>
            <div>총 구매 금액</div>
            <div>{formatPrice(totalPrice)}원</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalPrice;
