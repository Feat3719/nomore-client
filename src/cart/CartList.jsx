import { useState } from "react";
import axios from "axios";

function CartList({ item, style, onUpdate }) {
  const [cartCount, setCartCount] = useState(item.cartCount);
  // 화폐 단위 변환
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "decimal",
      currency: "KRW",
    }).format(price);
  };
  // 닫기 버튼 아이콘
  const deleteIcon =
    "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa8f094af-6e08-4df8-9b2b-f7f4eaa9e42d%2Fe45de36e-ec67-4455-b7f7-ba1ddd01a2f0%2FUntitled.png?table=block&id=44e30c9c-cdd2-4e5d-86ac-7721c6c76fa2&spaceId=a8f094af-6e08-4df8-9b2b-f7f4eaa9e42d&width=2000&userId=6519112b-50fc-4c6c-b9e6-174d9c3dbad1&cache=v2";

  const plusIcon =
    "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa8f094af-6e08-4df8-9b2b-f7f4eaa9e42d%2F07e61c0b-34f6-41c8-945f-0c7b5578a826%2FUntitled.png?table=block&id=04d507f7-44d0-4103-b73f-74ccbd2f48e4&spaceId=a8f094af-6e08-4df8-9b2b-f7f4eaa9e42d&width=2000&userId=6519112b-50fc-4c6c-b9e6-174d9c3dbad1&cache=v2";
  const minusIcon =
    "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa8f094af-6e08-4df8-9b2b-f7f4eaa9e42d%2F6c22adb9-9b3d-4b13-b90a-de7cd8276a9e%2FUntitled.png?table=block&id=4aeb0fc2-b43c-4872-beb4-547d0ea796fe&spaceId=a8f094af-6e08-4df8-9b2b-f7f4eaa9e42d&width=2000&userId=6519112b-50fc-4c6c-b9e6-174d9c3dbad1&cache=v2";

  const downCnt = () => {
    if (cartCount > 1) {
      const newCount = cartCount - 1;
      setCartCount(newCount);
      onUpdate({ ...item, cartCount: newCount });
    }
  };
  const upCnt = () => {
    const newCount = cartCount + 1;
    setCartCount(newCount);
    onUpdate({ ...item, cartCount: newCount });
  };
  // 제품 삭제 함수
  const handleDelete = async (prodId) => {
    try {
      await axios.delete(`/api/cart/product/${prodId}`, {
        params: {
          userId: "admin",
        },
      });
      alert("제품이 삭제되었습니다."); // 삭제 성공 메시지
    } catch (error) {
      console.error("Error deleting cart item:", error);
      alert("제품 삭제에 실패했습니다."); // 에러 메시지
    }
  };

  return (
    <>
      <li className={style.cart_list_item}>
        <div className={style.buy_stts_area}>
          <div>{item.prodId}</div>
        </div>
        <div className={style.prod_area}>
          <div className={style.prod_img_area}>
            <img src={item.prodImgUrl} alt="noImage" />
            <a href="/cart"></a>
          </div>

          <div className={style.prod_info_area}>
            <div className={style.buy_ymd}>1월 10일 결제</div>
            <div className={style.prod_name_area}>
              <div>{item.prodName}</div>
            </div>
            <div className={style.prod_prc_area}>
              <div>{formatPrice(item.prodPrc)}원</div>
            </div>
            {/* 클릭 시 제품 상세 페이지 이동 */}
            {/*<a href="/"></a>*/}
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleDelete(item.prodId)}
          className={style.deleteBtn}
        >
          <img src={deleteIcon} alt="-"></img>
        </button>

        {/* 구매 수량 버튼 */}
        <div className={style.cartCnt_btn_area}>
          <button type="button" onClick={downCnt}>
            <img src={minusIcon} alt="-" />
          </button>

          <input type="text" value={cartCount} disabled />

          <button type="button" onClick={upCnt}>
            <img src={plusIcon} alt="+" />
          </button>
        </div>
      </li>
    </>
  );
}

export default CartList;
