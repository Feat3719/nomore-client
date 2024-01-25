import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main/Main.jsx";
import Login from "./login/Login.jsx";
import SignUp from "./signup/SignUp.jsx";
import FindId from "./find_id/FindId";
import FindPw from "./find_pw/FindPw";
import axios from "axios";
import UserCheck from "./edit_user_info/UserCheck.jsx";
import EditUserInfo from "./edit_user_info/EditUserInfo.jsx";
// import Data from "./data/Data.jsx";
import Productlist from "./productlist/Productlist.jsx";
import MyOrder from "./my_order/MyOrder.jsx";
import Cart from "./cart/Cart.jsx";
import ProtectedRoute from "./reducers/ProtectedRoute.jsx";
import PublicOnlyRoute from "./reducers/PublicOnlyRoute.jsx";
import Productdetail from "./productpage/Productdetail.jsx";
import Header from "./header/Header.jsx";
import Nav from "./navigation/Nav.jsx";
import LoadingAnimation from "./loading/LoadingAnimation";
import { SetupAxiosInterceptors } from "./loading/SetupAxiosInterceptors";
import { useLoading } from "./loading/useLoading";
import CategoryNav from "./product/CategoryNav.jsx";

// axios.defaults.baseURL = "http://43.200.226.40:8080";
axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const go_main = () => {
    window.location.href = "/";
  };
  const { isLoading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    SetupAxiosInterceptors(startLoading, stopLoading);
  }, [startLoading, stopLoading]);

  return (
    <>
      <BrowserRouter>
        {isLoading && <LoadingAnimation />}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
              </>
            }
          />
          {/* <Route path="/data" element={<Data />} /> */}
          <Route
            path="/productlist/:category"
            element={
              <>
                <Nav />
                <Header />
                <CategoryNav />
                <Productlist />
              </>
            }
          />

          <Route
            path="/productdetail/:category/:productId"
            element={
              <>
                <Nav />
                <Header />
                <Productdetail />
              </>
            }
          ></Route>
        </Routes>
        {/* 비회원만 접근 가능한 페이지 */}
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <SignUp go_main={go_main} />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login go_main={go_main} />
              </PublicOnlyRoute>
            }
          />
          <Route
            path={"/findid"}
            element={
              <PublicOnlyRoute>
                <FindId go_main={go_main} />
              </PublicOnlyRoute>
            }
          />
          <Route
            path={"/findpw"}
            element={
              <PublicOnlyRoute>
                <FindPw go_main={go_main} />
              </PublicOnlyRoute>
            }
          />
        </Routes>
        {/* 인증된 사용자만 가능한 페이지 */}
        <Routes>
          {/* <Route
            path="/edit_user_info"
            element={
              <ProtectedRoute>
                <EditUserInfo />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/myorder"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              </>
            }
          />
          {/* <Route
            path={"/user_check"}
            element={
              <ProtectedRoute>
                <UserCheck go_main={go_main} />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
document.title = "NOMORE";
document.querySelector("html").lang = "ko";

export default App;
