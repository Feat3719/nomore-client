function ProdNav({ styles }) {
	return (
		<>
			<div className={styles.product_category_area}>
				<div className={styles.nav_product_category}>
					<ul>
						<li>
							<a href="/ProductpageTv">TV</a>
						</li>
						<div>|</div>
						<li>
							<a href="/ProductpageRef">냉장고</a>
						</li>
						<div>|</div>
						<li>
							<a href="/ProductpageWash">세탁기</a>
						</li>
						<div>|</div>
						<li>
							<a href="/ProductpageAir">에어컨</a>
						</li>
						<div>|</div>
						<li>
							<a href="/ProductpageRice">전기밥솥</a>
						</li>
						<div>|</div>
						<li>
							<a href="/ProductpageRice">청소기</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default ProdNav;
