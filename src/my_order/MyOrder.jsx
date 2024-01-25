import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import Nav from "../navigation/Nav";
import style from "./css/MyOrder.module.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState();

  // 주문 정보 가져오는 함수
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/purchase/list?userId=${userId}`);
      setOrders(response.data); // 가져온 데이터를 상태에 저장
    } catch (error) {
      console.error("주문 조회 실패:", error);
      // alert("주문 조회에 실패했습니다.");
    }
  }; // 컴포넌트 마운트 시 주문 정보 가져오기
  useEffect(() => {
    fetchOrders();
  }, []);

  // userId 상태 변경 함수
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  //

  const renderOrderList = () => {
    return orders.map((orders) => (
      <>
        <li className={style.order_list_item}>
          <div className={style.buy_stts_area}></div>
          <div className={style.prod_area}>
            <div className={style.prod_img_area}>
              <img src={orders.prodImgUrl} />
              <a href="/"></a>
            </div>

            <div className={style.prod_info_area}>
              <div className={style.buy_ymd}>1월 10일 결제</div>
              <div className={style.prod_namewe_area}>
                <div>물건 이름</div>
              </div>
              <div>
                <div>주문 번호: {orders.buyId}</div>
              </div>
              <div>
                <div>주문 상태: {orders.buyStts}</div>
              </div>
              <div>
                <div>주문 주소: {orders.buyAddr}</div>
              </div>
              <div>
                <div>수량: {orders.count}</div>
              </div>

              <div className={style.prod_prc_area}>
                <div>
                  {new Intl.NumberFormat("ko-KR").format(orders.price)} 원
                </div>
              </div>
              <p href="/"></p>
            </div>
          </div>
        </li>
      </>
    ));
  };

  return (
    <>
      <Nav />
      <Header />
      <div className={style.base}>
        <div className={style.background}>
          <div className={style.main_area}>
            <div className={style.order_list_area}>
              <ul className={style.order_list}>{renderOrderList()}</ul>
            </div>
            <input
              type="text"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="사용자 ID를 입력하세요"
            />
            <button onClick={fetchOrders}>주문 조회</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
