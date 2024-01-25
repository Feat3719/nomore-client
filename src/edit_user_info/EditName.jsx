// import style from "./css/EditUserInfo.module.css";

import { useState } from "react";

const EditName = ({ style, onNameChange }) => {
  const [showNameInputBox, setShowNameInputBox] = useState(false);
  const [name, setName] = useState("");
  const showInputBtn = () => {
    setShowNameInputBox(true);
  };
  const onNameHandler = (e) => {
    const newName = e.currentTarget.value;
    setName(newName);
    onNameChange(newName);
  };

  return (
    <>
      <tr>
        <th>이름</th>
        <td>
          <div className={style.name_area}>
            <div>
              <div className={style.show_name}>김수환무</div>
              <div onClick={showInputBtn} className={style.name_update_btn}>
                개명하셨나요? {">"}
              </div>
            </div>
            <div
              className={`${style.input_name_area} ${
                showNameInputBox ? style.input_name_area : style.hidden
              }`}
            >
              <input
                type="text"
                maxLength="20"
                onChange={onNameHandler}
                value={name}
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default EditName;
