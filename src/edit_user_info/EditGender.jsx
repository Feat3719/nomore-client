import React, { useState } from "react";

const EditGender = ({ style, onChange }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const changeGender = (event) => {
    const newGender = event.target.value;
    setSelectedGender(newGender);
    onChange(newGender); // 상위 컴포넌트에 변경 사항 전달
  };

  return (
    <tr>
      <th>성별</th>
      <td>
        <select
          name="select_gender"
          value={selectedGender}
          id="select_gender"
          className={style.select_gender}
          onChange={changeGender}
        >
          <option disabled value={null}>
            성별
          </option>
          <option value="M">남자</option>
          <option value="F">여자</option>
        </select>
      </td>
    </tr>
  );
};

export default EditGender;
