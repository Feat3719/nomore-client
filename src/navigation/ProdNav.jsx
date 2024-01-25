import style from "./Nav.module.css";

function ProdNav() {
  return (
    <>
      <div className={style.product_category}>
        <ul>
          <li>
            <a href="/ProductpageTv">TV</a>
          </li>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <li>
            <a href="/ProductpageRef">냉장고</a>
          </li>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <li>
            <a href="/ProductpageWash">세탁기</a>
          </li>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <li>
            <a href="/ProductpageAir">에어컨</a>
          </li>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <li>
            <a href="/ProductpageRice">전기밥솥</a>
          </li>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <li>
            <a href="/ProductpageRice">청소기</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProdNav;
