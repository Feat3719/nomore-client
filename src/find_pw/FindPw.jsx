import { useState } from "react";
import style from "./css/FindPw.module.css";
import axios from "axios";

function FindPw({ go_main }) {
  const go_find_id = () => {
    window.location.href = "/findid";
  };

  const [userId, setUserId] = useState("");
  const [isIdValid, setIsValid] = useState(true);

  const [userEmail, setUserEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const inputRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const activateBtn = userId.length >= 5 && (isIdValid || isEmailValid);

  // id 입력 조건 충족 확인
  const inputIdCheck = (e) => {
    const inputValue = e.target.value;
    setUserId(inputValue);
    const isInputValid = inputRegex.test(inputValue);
    setIsValid(isInputValid);
  };
  // 이메일 입력 조건 충족 확인
  const inputEmailCheck = (e) => {
    const inputValue = e.target.value;
    setUserEmail(inputValue);
    const isInputValid = emailRegex.test(inputValue);
    setIsEmailValid(isInputValid);
  };
  // 조건 충족 시 버튼 활성화
  const ableClick = async () => {
    if (activateBtn) {
      const response = await axios
        .get("/api/email/userpwd", {
          params: {
            userId: userId,
            userEmail: userEmail,
          },
        })
        .catch((error) => {
          alert("다시 시도해 주세요");
        });
      if (response.status == 200) {
        alert("해당 이메일로 임시 비밀번호를 전송했습니다.");
        if (window.confirm("지금 바로 로그인 하시겠습니까?")) {
          window.location.href = "/login";
        } else {
          window.location.reload();
        }
      } else {
        alert("등록되지 않은 이메일입니다.");
        if (
          window.confirm(
            "수많은 혜택이 기다리고있습니다. 회원가입 하시겠습니까?"
          )
        ) {
          window.location.href = "/signup";
        } else {
          window.location.reload();
        }
      }
    }
  };

  return (
    <>
      <div className={style.background}>
        <div className={style.find_pw_area}>
          <div className={style.logo_area}>
            <div onClick={go_main} className={style.main_logo}>
              NOMORE
            </div>
          </div>
          <div className={style.title_area}>
            <div onClick={go_find_id}>
              <span>아이디 찾기</span>
            </div>
            <div>
              <span>비밀번호 찾기</span>
            </div>
          </div>
          <div className={style.input_area}>
            <label htmlFor="input_email">
              등록된 아이디와 이메일을 입력하세요.
            </label>
            <input
              id="input_id"
              type="text"
              value={userId}
              placeholder="아이디 입력"
              onChange={inputIdCheck}
            />
            <input
              id="input_email"
              type="text"
              value={userEmail}
              placeholder="이메일 입력"
              onChange={inputEmailCheck}
            />
            <button
              className={activateBtn ? style.activateBtn : style.deactivateBtn}
              disabled={!activateBtn}
              onClick={ableClick}
            >
              확인
            </button>
            {(!isIdValid || !isEmailValid) && (
              <p className={style.error}>
                아이디 또는 이메일을 다시 입력해 주세요.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FindPw;
