import style from "./css/CategoryNav.module.css";
function CategoryNav() {
  const goTvCategory = () => {
    window.location.href = "/Productlist/C001";
  };
  const goRefriCategory = () => {
    window.location.href = "/Productlist/C002";
  };
  const goWashCategory = () => {
    window.location.href = "/Productlist/C003";
  };
  const goAirCategory = () => {
    window.location.href = "/Productlist/C004";
  };
  const goCooCategory = () => {
    window.location.href = "/Productlist/C005";
  };
  return (
    <>
      <div className={style.category_nav_area}>
        <div className={style.nav_product_category}>
          <div onClick={goTvCategory}>TV</div>
          <div onClick={goRefriCategory}>냉장고</div>
          <div onClick={goWashCategory}>세탁기</div>
          <div onClick={goAirCategory}>에어컨</div>
          <div onClick={goCooCategory}>전기밥솥</div>
        </div>
      </div>
    </>
  );
}

export default CategoryNav;
