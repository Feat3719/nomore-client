import React, { useState } from "react";

const EditMember = ({ style, onChange }) => {
  const [members, setMembers] = useState("");

  const handleMemberChange = (event) => {
    const newMembers = event.target.value;
    setMembers(newMembers);
    onChange(newMembers);
  };

  return (
    <tr>
      <th>가구원 수(명)</th>
      <td>
        <select
          name="member_cnt"
          id="member_cnt"
          className={style.select_member_cnt}
          onChange={handleMemberChange}
          value={members}
        >
          <option disabled value="">
            선택
          </option>
          <option value="1인가구">1명</option>
          <option value="2인가구">2명</option>
          <option value="3인가구">3명</option>
          <option value="4명가구이상">4명 이상</option>
          {/* 추가 옵션 필요 시 여기에 추가 */}
        </select>
      </td>
    </tr>
  );
};

export default EditMember;
