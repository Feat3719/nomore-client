import "./Main.module.css";
import style from "./Main.module.css";
import Product from "../product/Product";
import Header from "../header/Header";
import Nav from "../navigation/Nav";
import CategoryNav from "../product/CategoryNav";

function Main() {
  return (
    <>
      <Nav />
      <Header />
      <CategoryNav />
      <div className={style.main}>
        <Product />
      </div>
    </>
  );
}

export default Main;
