import axios from "axios";

function UserCheckInputArea({ style }) {
  const go_edit_user_info = async() => {
	const response = await axios.get("",{

	})
  };

  return (
    <>
      <div className={style.main_area}>
        <div className={style.title_area}>
          <div>회원정보확인</div>
        </div>
        <div className={style.input_describe_area}>
          <span>회원님의 비밀번호를 다시 한번 확인합니다.</span>
        </div>
        <div className={style.input_area}>
          {/* 회원 정보 영역 */}
          <div>
            <div>
              <section>
                <table className={style.userCheck_table}>
                  <tbody>
                    {/* 아이디 영역 */}
                    <tr>
                      <th>아이디</th>
                      <td>abcd@gmail.com</td>
                    </tr>
                    {/* 비밀번호 영역 */}
                    <tr>
                      <th>비밀번호</th>
                      <td className={style.input_pw_area}>
                        <input type="password" maxLength={20} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={style.button_area}>
                  <button type="submit" onClick={go_edit_user_info}>
                    확인
                  </button>
                  <button type="button">취소</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCheckInputArea;
