import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "../BtnStyle.module.css";

function LogOutBtn() {
  const dispatch = useDispatch();
  // Redux 상태에서 userId 가져오기
  const userId = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    if (userId) {
      // 서버에 로그아웃 요청 보내기
      try {
        await axios.post("/api/auth/signout", {
          userId: userId,
        });
        // 쿠키에서 refreshToken 삭제
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } catch (error) {
        alert("다시 시도해주시기 바랍니다.");
      }
    }

    // Redux 상태 업데이트
    dispatch({ type: "LOGOUT" });

    // 홈페이지로 리디렉션
    window.location.href = "/";
  };

  return (
    <p className={style.custom_btn} onClick={handleLogout}>
      로그아웃
    </p>
  );
}

export default LogOutBtn;
