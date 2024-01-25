import style from "./css/SignUp.module.css";
import { useState, useRef } from "react";
import axios from "axios";
// import { useState } from "react";

// const [all_allow, setAll_allow] = useState(false);
// const [terms, setTerms] = useState({
// 	term_age_allow: false,
// 	term_info_allow: false,
// 	term_marketing_allow: false
// });

function SignUp({ go_main }) {
  // 약관 동의
  const [terms, setTerms] = useState({
    term_allow_all: false,
    term_age_allow: false,
    term_info_allow: false,
    term_marketing_allow: false,
  });

  const [completeTermAllow, setCompleteTermAllow] = useState(false);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (id === "term_allow_all") {
      setTerms({
        term_allow_all: checked,
        term_age_allow: checked,
        term_info_allow: checked,
        term_marketing_allow: checked,
      });
    } else {
      setTerms({ ...terms, [id]: checked });
    }

    // 전체 선택 체크박스 상태와 필수 약관 동의 상태 업데이트
    setTerms((prevTerms) => {
      const updatedTerms = { ...prevTerms, [id]: checked };
      const { term_age_allow, term_info_allow } = updatedTerms;
      const allRequiredChecked = term_age_allow && term_info_allow;

      // 필수 약관이 모두 체크되었는지 확인
      setCompleteTermAllow(allRequiredChecked);

      // 전체 선택 체크박스 상태 업데이트
      if (!checked) {
        return { ...updatedTerms, term_allow_all: false };
      } else {
        const allChecked =
          term_age_allow &&
          term_info_allow &&
          updatedTerms.term_marketing_allow;
        return { ...updatedTerms, term_allow_all: allChecked };
      }
    });
  };

  // useState
  const [Id, setId] = useState("");
  const [Pwd, setPwd] = useState("");
  const [PwdConfrim, setPwdConfirm] = useState("");
  const [Email, setEmail] = useState("");
  const [EmailAuth, setEmailAuth] = useState("");
  const [isEmailAuth, setIsEmailAuth] = useState(false);
  const [isEmailAuthCorrect, setIsEmailAuthCorrect] = useState(true);
  const [emailCode, setEmailCode] = useState("");
  const [selectedEmailValue, setSelectedEmailValue] = useState("");
  const [totalEmail, setTotalEmail] = useState("");
  const [completeIdDup, setCompleteIdDup] = useState(false);
  const [completePwdTest, setCompletePwdTest] = useState(false);
  const [completePwdTestAgain, setCompletePwdTestAgain] = useState(false);
  const [completeEmailAuth, setCompleteEmailAuth] = useState(false);
  const [isMatch, setIsMatch] = useState(true);

  const [idToDisabled, setIdToDisabled] = useState(false);
  const [emailInputToDisabled, setEmailInputToDisabled] = useState(false);
  const [emailSelectToDisabled, setEmailSelectToDisabled] = useState(false);
  const [emailAuthComplete, setEmailAuthComplete] = useState(false);
  const IdRef = useRef();
  const EmailRef = useRef();
  const PwdRef = useRef();

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onPwdConfirmHandler = (e) => {
    setPwdConfirm(e.currentTarget.value);
    if (Pwd === e.currentTarget.value) {
      setIsMatch(true);
    } else setIsMatch(false);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handleSelectEmailChange = (e) => {
    setSelectedEmailValue(e.target.value);
  };

  // 아이디 중복확인
  const idDupBtn = async () => {
    const isDup = await axios.get("/api/auth/check-avilability-userid", {
      params: {
        userId: Id,
      },
    });
    if (!isDup.data) {
      alert("이미 사용중인 아이디입니다.");
      IdRef.current.focus();
    } else if (isDup.data) {
      alert("사용 가능합니다.");
      setCompleteIdDup(true);
    } else {
      alert("다시 시도해주시기 바랍니다.");
    }
  };

  // 비밀번호 확인
  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    return regex.test(Pwd);
  };
  const onPwdHandler = (e) => {
    const newPwd = e.currentTarget.value;
    setPwd(newPwd);
    const isValid = validatePassword(newPwd);
    if (isValid) {
      setCompletePwdTest(true);
      setCompletePwdTestAgain(false);
    } else {
      setCompletePwdTest(false);
      setCompletePwdTestAgain(true);
    }
    if (Pwd === e.currentTarget.value) {
      setIsMatch(true);
    } else setIsMatch(false);

    // setIsMatch(PwdConfirm === newPwd);
  };

  // 회원가입 이메일 인증
  const emailAuthBtn = async () => {
    setTotalEmail(Email + "@" + selectedEmailValue);
    if (totalEmail.length > 0) {
      await axios
        .post("/api/email/auth-signup", {
          userEmail: totalEmail,
        })
        .then((response) => {
          setIsEmailAuth(true);
          setEmailCode(response.data.code);
          alert("해당 이메일로 인증코드가 전송되었습니다.");
        })
        .catch((error) => {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          } else {
            alert("다시 시도해주세요");
          }
        });
    }
  };
  const onEmailAuthInputHandler = (e) => {
    setEmailAuth(e.currentTarget.value);
    if (e.currentTarget.value === emailCode) {
      setIsEmailAuth(false);
      setIsEmailAuthCorrect(false);
      setEmailInputToDisabled(true);
      setEmailSelectToDisabled(true);
      setCompleteEmailAuth(true);
      setEmailAuthComplete(true);
    }
  };
  // 회원가입 진행
  const SignUpBtn = async () => {
    if (!completeIdDup) {
      alert("아이디 중복체크를 진행해주세요.");
      IdRef.current.focus();
    }
    if (!completePwdTest) {
      alert("비밀번호를 입력해주세요.");
      PwdRef.current.focus();
    }
    if (!completeEmailAuth) {
      alert("이메일을 입력해주세요.");
      EmailRef.current.focus();
    }
    if (!completeTermAllow) {
      alert("약관에 동의해주세요.");
    }

    const response = await axios.post("/api/auth/user", {
      userId: Id,
      userPwd: Pwd,
      userEmail: totalEmail,
    });
    if (response.status == 201) {
      alert("성공적으로 회원가입하셨습니다.");
      if (window.confirm("지금 바로 로그인 하시겠습니까?")) {
        window.location.href = "/login";
      } else {
        window.location.href = "/";
      }
    } else {
      alert("다시 시도해 주시기 바랍니다.");
      window.location.reload();
    }
  };
  return (
    <>
      <div className={style.background}>
        <div className={style.signup_area}>
          {/* 메인 로고 영역 */}
          <div className={style.logo_title_area}>
            <div onClick={go_main} className={style.main_logo}>
              NOMORE
            </div>
            <div className={style.title}>회원가입</div>
          </div>

          {/* 회원 정보 입력 영역 */}
          <div className={style.input_area}>
            <div className={style.input_box}>
              <div className={style.input_id}>
                <input
                  id="signup_input_id"
                  type="text"
                  maxLength="25"
                  placeholder="아이디"
                  onChange={onIdHandler}
                  value={Id}
                  ref={IdRef}
                />
                <button onClick={idDupBtn} type="button">
                  중복확인
                </button>
              </div>

              <input
                onChange={onPwdHandler}
                value={Pwd}
                ref={PwdRef}
                type="password"
                maxLength="20"
                placeholder="비밀번호"
              />
              <input
                onChange={onPwdConfirmHandler}
                value={PwdConfrim}
                type="password"
                maxLength="20"
                placeholder="비밀번호 확인"
              />
              <div className={style.alertDiv}>
                {" "}
                {isMatch ? (
                  <p className={style.PwdAlert}></p>
                ) : (
                  <p className={style.PwdAlert}>비밀번호가 다릅니다</p>
                )}
              </div>
              <div className={style.alertDiv}>
                {completePwdTest ? (
                  <p className={style.PwdCompelete}>안전한 비밀번호 입니다.</p>
                ) : (
                  <></>
                )}
              </div>
              <div className={style.alertDiv}>
                {completePwdTestAgain ? (
                  <p className={style.PwdAlert}>
                    영소문자,특수문자,숫자 최소 한글자 이상
                    사용해주세요(8글자이상)
                  </p>
                ) : (
                  <p className={style.PwdAlert}></p>
                )}
              </div>

              <div className={style.input_email_area}>
                <input
                  value={Email}
                  onChange={onEmailHandler}
                  ref={EmailRef}
                  disabled={emailInputToDisabled}
                  type="text"
                  maxLength="20"
                  placeholder="이메일"
                  tyle={{ "margin-top": "2rem" }}
                />
                <span>@</span>
                <select
                  value={selectedEmailValue}
                  onChange={handleSelectEmailChange}
                  disabled={emailSelectToDisabled}
                >
                  <option>선택하세요</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  {/* <option value="type">직접 입력</option> */}
                </select>
              </div>
              <div className={style.email_check_area}>
                {isEmailAuthCorrect ? (
                  <button onClick={emailAuthBtn}>이메일 인증</button>
                ) : (
                  <></>
                )}
                {emailAuthComplete ? (
                  <p className={style.emailComplete}>인증되셨습니다.</p>
                ) : (
                  <></>
                )}
                {/* display: none 숨김 처리 (예정) */}
                <div className={style.email_check_input_area}>
                  {isEmailAuth ? (
                    <input
                      onChange={onEmailAuthInputHandler}
                      value={EmailAuth}
                      type="text"
                      placeholder="인증코드 입력"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            <div className={style.line}></div>

            {/* 약관 동의 영역 */}
            <div className={style.terms_area}>
              <div>
                <input
                  type="checkbox"
                  id="term_allow_all"
                  checked={terms.term_allow_all}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="term_allow_all">전체 약관 동의</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="term_age_allow"
                  checked={terms.term_age_allow}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="term_age_allow">
                  만 14세 이상입니다.{" "}
                  <span className={style.must_allow}>(필수)</span>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="term_info_allow"
                  checked={terms.term_info_allow}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="term_info_allow">
                  개인정보 수집 및 이용{" "}
                  <span className={style.must_allow}>(필수)</span>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="term_marketing_allow"
                  checked={terms.term_marketing_allow}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="term_marketing_allow">
                  마케팅 활용 및 광고성 정보 수신 동의
                  <span> (선택)</span>
                </label>
              </div>
            </div>
            <div className={style.singin_btn_area}>
              <button onClick={SignUpBtn}>회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
