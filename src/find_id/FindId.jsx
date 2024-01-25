import { useState, useRef } from "react";
import style from "./css/FindId.module.css";
import axios from "axios";

function FindId({ go_main }) {
  const go_find_pw = () => {
    window.location.href = "/findpw";
  };

  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isAuth, setIsAuth] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const activateBtn = email.length >= 8 && isValid;
  const inputCheck = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    const isInputValid = emailRegex.test(inputValue);
    setIsValid(isInputValid);
  };
  const ableClick = async () => {
    if (activateBtn) {
      const code = axios.get("/api/email/userid", {
        params: {
          useEmail: email,
        },
      });
      if (code.status == 200) {
        alert("해당 이메일로 아이디를 전송했습니다.");
      } else {
        alert("등록되지 않은 이메일입니다.");
        if (
          window.confirm(
            "수많은 혜택이 기다리고있습니다. 회원가입 하시겠습니까?"
          )
        ) {
          window.location.href = "/signup";
        }
      }
    }
  };

  const inputRef = useRef();

  return (
    <>
      <div className={style.background}>
        <div className={style.find_id_area}>
          <div className={style.logo_area}>
            <div onClick={go_main} className={style.main_logo}>
              NOMORE
            </div>
          </div>
          <div className={style.title_area}>
            <div>
              <span>아이디 찾기</span>
            </div>
            <div onClick={go_find_pw}>
              <span>비밀번호 찾기</span>
            </div>
          </div>
          <div className={style.input_area}>
            <label htmlFor="input_email">등록된 이메일을 입력하세요.</label>
            <input
              id="input_email"
              type="text"
              value={email}
              placeholder="이메일 입력"
              onChange={inputCheck}
              ref={inputRef}
            />
            {isAuth ? <></> : <></>}
            <button
              className={activateBtn ? style.activateBtn : style.deactivateBtn}
              disabled={!activateBtn}
              onClick={ableClick}
            >
              확인
            </button>
            {!isValid && (
              <p className={style.error}>이메일 형식이 올바르지 않습니다.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FindId;
