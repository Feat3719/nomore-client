// import { useState } from "react";

// function LoginInput({ style }) {
// 	const go_findId = () => {
// 		window.location.href = "/findid";
// 	};
// 	const go_findPw = () => {
// 		window.location.href = "/findpw";
// 	};
// 	const go_signin = () => {
// 		window.location.href = "/signin";
// 	};

// 	const [userId, setUserId] = useState("");
// 	const [isIdValid, setIsValid] = useState(true);

// 	const [userPw, setUserPw] = useState("");
// 	const [isPwValid, setIsPwValid] = useState(true);

// 	const inputRegex = /^[a-zA-Z0-9]+$/;

// 	const activateBtn =
// 		userId.length >= 4 && isIdValid && userPw.length >= 5 && isPwValid;

// 	// id 입럭 조건 충족 확인
// 	const inputIdCheck = (e) => {
// 		const inputValue = e.target.value;
// 		setUserId(inputValue);
// 		const isInputValid = inputRegex.test(inputValue);
// 		setIsValid(isInputValid);
// 	};

// 	// pw 입력 조건 충족 확인
// 	const inputPwCheck = (e) => {
// 		const inputValue = e.target.value;
// 		setUserPw(inputValue);
// 		const isInputValid = inputRegex.test(inputValue);
// 		setIsPwValid(isInputValid);
// 	};

// 	// 조건 충족 시 버튼 활성화
// 	const ableClick = () => {
// 		if (activateBtn) {
// 			// input 정보 전달
// 			console.log("클릭 가능!");
// 		}
// 	};
// 	return (
// 		<>
// 			{/* <div className={style.input_area}> */}
// 				<div className={style.input_box}>
// 					<input
// 						type="text"
// 						value={userId}
// 						maxLength="25"
// 						placeholder="아이디 입력"
// 						onChange={inputIdCheck}
// 					/>
// 					<input
// 						type="password"
// 						value={userPw}
// 						maxLength="20"
// 						placeholder="비밀번호 입력"
// 						onChange={inputPwCheck}
// 					/>
// 					<button
// 						type="button"
// 						className={activateBtn ? style.activateBtn : style.deactivateBtn}
// 						disabled={!activateBtn}
// 						onClick={ableClick}
// 					>
// 						로그인
// 					</button>
// 				</div>
// 				<div className={style.option_area}>
// 					<span onClick={go_findId}>아이디 찾기</span>
// 					<span onClick={go_findPw}>비밀번호 찾기</span>
// 					<span onClick={go_signin}>회원가입</span>
// 				</div>
// 				{(!isIdValid || !isPwValid) && (
// 					<p className={style.error}>
// 						아이디 또는 이메일을 다시 입력해 주세요.
// 					</p>
// 				)}
// 			{/* </div> */}
// 		</>
// 	);
// }

// export default LoginInput;
