import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./css/EditUserInfo.module.css";
import EditName from "./EditName";
import EditGender from "./EditGender";
import EditBirth from "./EditBirth";
import EditEmail from "./EditEmail";
import EditPhone from "./EditPhone";
import EditAddress from "./EditAddress";
import EditMember from "./EditMember";

function EditUserInfoInputArea() {
  const go_main = () => {
    window.location.href = "/";
  };
  const userId = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState({ year: null, month: null, day: null });
  const [members, setMembers] = useState(null);
  const [address, setAddress] = useState("");
  const handleNameChange = (newName) => {
    setName(newName);
  };
  const handleGenderChange = (newGender) => {
    setGender(newGender);
  };
  const handleMemberChange = (newMembers) => {
    setMembers(newMembers);
  };
  const handleBirthChange = (type, value) => {
    setBirthDate({ ...birthDate, [type]: value });
  };
  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };
  return (
    <>
      <div className={style.main_area}>
        <div className={style.title_area}>
          <div>회원정보수정</div>
        </div>

        {/* 회원 정보 영역 */}
        <div>
          <div>
            <section>
              <table className={style.edit_info_table}>
                <tbody>
                  <tr>
                    <th>아이디</th>
                    <td>{userId}</td>
                  </tr>
                  <EditName style={style} onNameChange={handleNameChange} />
                  <EditGender style={style} onChange={handleGenderChange} />
                  <EditBirth style={style} onChange={handleBirthChange}/>
                  <EditEmail style={style} />
                  <EditPhone style={style} />
                  <EditAddress style={style}onChange={handleAddressChange} />
                  <EditMember style={style} onChange={handleMemberChange}/>
                  {/* <tr>
										<th>가입일</th>
										<td>2023년 12월 31일</td>
									</tr> */}
                </tbody>
              </table>
              <div className={style.btn_area}>
                <div className={style.confirm_btn_area}>
                  <button>확인</button>
                  <button>취소</button>
                </div>
                <div className={style.delete_account_area}>
                  <button onClick={go_main}>회원 탈퇴</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserInfoInputArea;
