import React, { useState } from "react";

const EditEmail = ({ style }) => {
	const [showEmailInputBox, setShowEmailInputBox] = useState(false);
	const showInputBtn = () => {
		setShowEmailInputBox(true);
	};
	return (
		<>
			<tr>
				<th>이메일</th>
				<td>
					<div className={style.email_area}>
						<div>asdf@gmail.com</div>
						<button type="button" onClick={showInputBtn}>이메일 변경</button>
						<div className={`${style.input_email_area} ${showEmailInputBox ? style.input_email_area : style.hidden}`}>
							<input type="text" maxLength="30" />
						</div>
					</div>
				</td>
			</tr>
		</>
	);
};

export default EditEmail;
