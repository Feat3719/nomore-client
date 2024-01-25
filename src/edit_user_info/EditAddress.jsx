import React, { useState } from "react";

const EditAddress = ({ style, onChange }) => {
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = () => {
    onChange(address);
    setIsEditing(false); // 편집 상태 종료
  };

  return (
    <tr>
      <th>주소</th>
      <td>
        <div className={style.address_area}>
          {!isEditing ? (
            <>
              <div>{address}</div>
              <button onClick={() => setIsEditing(true)} type="button">
                주소 변경
              </button>
            </>
          ) : (
            <div className={style.input_address_area}>
              <input
                type="text"
                maxLength="50"
                value={address}
                onChange={handleAddressChange}
              />
              <button onClick={handleSubmit} type="button">
                저장
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EditAddress;
