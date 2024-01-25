import { useState } from "react";
import style from "./css/login.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login({ go_main }) {
  const inputRegex = /^[a-zA-Z0-9]+$/;

  //   const activateBtn = Id.length >= 4 && Id && Pwd.length >= 5 && Pwd;

  // 조건 충족 시 버튼 활성화
  //   const ableClick = () => {
  //     if (activateBtn) {
  //       // input 정보 전달
  //       console.log("클릭 가능!");
  //     }
  //   };
  const [Id, setId] = useState("");
  const [Pwd, setPwd] = useState("");

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };
  const onPwdHandler = (e) => {
    setPwd(e.currentTarget.value);
  };

  const dispatch = useDispatch();
  const loginBtn = async () => {
    try {
      const response = await axios.post("/api/auth/signin", {
        userId: Id,
        userPwd: Pwd,
      });

      if (response.status == 201) {
        const userIdInClient = Id;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: userIdInClient,
            accessToken: response.data.accessToken,
          },
        });

        alert("환영합니다.");
        window.location.href = "/";
      } else if (response.status == 404) {
        if (response.data.message == "사용자를 찾을 수 없음") {
          alert(response.data.message);
        } else if (response.data.message == "비밀번호가 일치하지 않습니다.") {
          alert(response.data.message);
        } else alert("오류");
      } else {
        alert("다시 로그인 해주세요.");
      }
    } catch (error) {
      alert("아이디를 확인해주세요");
    }
  };

  const go_findId = () => {
    window.location.href = "/findid";
  };
  const go_findPw = () => {
    window.location.href = "/findpw";
  };
  const go_signup = () => {
    window.location.href = "/signup";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginBtn(); // 작성한 댓글 post 요청하는 함수
    }
  };
  return (
    <>
      <div className={style.background}>
        <div className={style.login_area}>
          {/* 메인 로고 영역*/}
          <div className={style.logo_area}>
            <div onClick={go_main} className={style.main_logo}>
              NOMORE
            </div>
          </div>

          {/* 아이디, 비밀번호 영역 */}
          <div className={style.input_area}>
            <div className={style.input_box}>
              <input
                onChange={onIdHandler}
                value={Id}
                type="text"
                maxLength="25"
                placeholder="아이디"
              />
              <input
                onChange={onPwdHandler}
                value={Pwd}
                type="password"
                maxLength="20"
                placeholder="비밀번호"
                onKeyDown={handleKeyDown}
              />
              <button
                className={style.LoginBtn}
                onClick={loginBtn}
                type="button"
              >
                로그인
              </button>
            </div>
            <div className={style.option_area}>
              <span onClick={go_findId}>아이디 찾기</span>
              <span onClick={go_findPw}>비밀번호 찾기</span>
              <span onClick={go_signup}>회원가입</span>
            </div>
          </div>
          {/* SNS 로그인 -> 예정 */}
          {/* <div className={style.sns_area}> */}
          {/*<div>네이버</div>*/}
          {/*<div>카카오</div>*/}
          {/*<div>페이스북</div>*/}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Login;
