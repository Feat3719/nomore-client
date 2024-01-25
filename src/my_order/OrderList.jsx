const OrderList = ({ order, style }) => {
  // order 객체에서 필요한 정보를 추출
  const { buy_ymd, prod_name, prod_prc, prod_img_url } = order;

  return (
    <>
      <li className={style.order_list_item}>
        <div className={style.buy_stts_area}>
          <div>{order.buy_stts}</div>
        </div>
        <div className={style.prod_area}>
          <div className={style.prod_img_area}>
            <img src={prod_img_url} alt={prod_name} />
            <a href="/"></a>
          </div>

          <div className={style.prod_info_area}>
            <div className={style.buy_ymd}>{buy_ymd} 결제</div>
            <div className={style.prod_name_area}>
              <div>{prod_name}</div>
            </div>
            <div className={style.prod_prc_area}>
              <div>{prod_prc}원</div>
            </div>
            <p href="/"></p>
          </div>
        </div>
      </li>
    </>
  );
};

export default OrderList;
