import React, { useState } from "react";

const EditPhone = ({ style }) => {
	const [showPhoneInputBox, setShowPhoneInputBox] = useState(false);
	const showInputBtn = () => {
		setShowPhoneInputBox(true);
	};
	return (
		<>
			<tr>
				<th>전화번호</th>
				<td>
					<div className={style.phone_area}>
						<div>010-2348-8474</div>
						<button onClick={showInputBtn}>전화번호 변경</button>
						<div className={`${style.input_phone_area} ${showPhoneInputBox ? style.input_phone_area : style.hidden}`}>
							<input type="text" maxLength="11" />
						</div>
					</div>
				</td>
			</tr>
		</>
	);
};

export default EditPhone;
