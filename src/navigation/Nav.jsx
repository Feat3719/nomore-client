import LogOutBtn from "../reducers/LogOutBtn";
import style from "./Nav.module.css";
import { useSelector } from "react-redux";

function Nav() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        // 회원일 때 보여줄 내용
        <div className={style.nav}>
          <ul>
            {/* <li>
              <a href="/edit_user_info">MyInfo</a>
            </li>
            &nbsp;&nbsp;|&nbsp;&nbsp; */}
            <li>
              <a href="/cart">Cart</a>
            </li>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <li>
              <a href="/myorder">MyOrder</a>
            </li>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <li>
              <LogOutBtn />
            </li>
          </ul>
        </div>
      ) : (
        // 비회원일 때 보여줄 내용
        <div className={style.nav}>
          <ul>
            <li>
              <a href="/login">Login</a>
            </li>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <li>
              <a href="/signup">Join</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Nav;
