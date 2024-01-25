import style from "./css/CommHeader.module.css";

function CommHeader() {
	return (
		<>
			<div className={style.headerBgr}>
				<div className={style.header_area}>
					<div className={style.main_logo_area}>
						<span>NOMORE</span>
					</div>
					<div>
						<span>내 정보</span>
					</div>
				</div>
			</div>
		</>
	);
}
// document.querySelector("body").style = "padding-top: 20vh";

export default CommHeader;
