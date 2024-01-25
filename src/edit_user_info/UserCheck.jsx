import style from "./css/UserCheck.module.css";
import UserCheckInputArea from "./UserCheckInputArea";

function UserCheck({ go_main }) {
	return (
		<>
			<div className={style.background}>
				<div className={style.header_area}>
					<div className={style.logo_area}>
						<div onClick={go_main} className={style.main_logo}>
							NOMORE
						</div>
					</div>
					<UserCheckInputArea style={style} />
				</div>
			</div>
		</>
	);
}

export default UserCheck;
