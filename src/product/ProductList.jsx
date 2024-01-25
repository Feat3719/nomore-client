import styles from "./css/ProductPage.module.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

// 프로덕트 카테고리페이지에 나열되어있는 프로덕트 리스트창

function ProductList() {
	const [data, setData] = useState(null);
	const [category, setCategory] = useState("C001");
	const [currentPage, setCurrentPage] = useState(1);
	const [sorter, setSorter] = useState("prod_energy");
	const [orderType, setOrderType] = useState("ASC");
	const [size, setSize] = useState("10");

	useEffect(() => {
		const url = `/api/category?categoryId=${category}&page=${currentPage}&sorter=${sorter}&orderType=${orderType}&size=${size}`;

		axios
			.get(url)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, [category, currentPage, sorter, orderType, size]); // currentPage 또는 pageSize가 변경될 때마다 useEffect가 실행됩니다.
	//CategoryId => C001,~C006
	//sorter =>prod_energy,...
	//orderType =>acs, desc

	const goToPrevPage = () => {
		setCurrentPage(currentPage - 1);
	};
	const goToNextPage = () => {
		setCurrentPage(currentPage + 1);
	};
	const handlePageSizeChange = (event) => {
		setSize(event.target.value);
	};

	const handleSorterChange = (event) => {
		setSorter(event.target.value);
	};

	const handleOrderTypeChange = (event) => {
		setOrderType(event.target.value);
	};

	const productData = [
		{
			prodId: "P00001",
			prodName: "LG전자 오브제컬렉션 네이처 T873MKE111 (클레이핑크+베이지)",
			prodCount: 100,
			prodPrc: 1597300,
			prodImgUrl:
				"https://img.danawa.com/prod_img/500000/654/660/img/17660654_1.jpg?shrink=330:*&_v=20231030092128",
			prodDtls: "RD00001",
			prodEnergy: "1",
		},
	];

	return (
		<div>
			{data ? (
				<div>
					{" "}
					<div>
						<div className={styles.product_list}>
							{" "}
							{data.map((product, index) => (
								<div className={styles.product_box} key={index}>
									<a className={styles.lista} href="#">
										<img
											className={styles.product_image}
											src={product.prodImgUrl}
											alt="상품 이미지"
										/>
									</a>
									<div className={styles.product_name}>{product.prodName}</div>
									<div className={styles.product_rating}>
										에너지소비효율등급 {product.prodEnergy}등급
									</div>
									<div className={styles.product_price}>
										{product.prodPrc}원
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						서버로부터 받은 데이터 (페이지 {currentPage}, 사이즈 {size}):
					</div>
					{/* <div>{JSON.stringify(data, null, 2)}</div> */}
					<div>
						<div>
							{/* 카테고리 변경 */}
							<select onChange={(e) => setCategory(e.target.value)}>
								<option value="C001">C001</option>
								<option value="C002">C002</option>
								<option value="C003">C003</option>
								<option value="C004">C004</option>
								<option value="C005">C005</option>
								<option value="C006">C006</option>
								{/* 기타 카테고리 옵션 */}
							</select>

							{/* 페이지 변경 */}
							<button onClick={goToPrevPage}>이전 페이지</button>
							<button onClick={goToNextPage}>다음 페이지</button>

							{/* 페이지 크기 변경 */}
							<select onChange={handlePageSizeChange}>
								<option value="20">20개씩 보기</option>
								<option value="40">40개씩 보기</option>
								{/* 기타 페이지 크기 옵션 */}
							</select>

							{/* 정렬 기준 변경 : 에너지 효율 등급순, 가격순, 최신순, 제조회사이름순 정도만 갖다 쓰시면 될거같습니다.
              낮은가격순, 높은가격순 구현시 (가격, 오름차순) 파라메터 두개 한꺼번에 변경하는 로직...짜시면 됩니다.^_^9*/}
							<select onChange={(e) => setSorter(e.target.value)}>
								<option value="prod_energy">에너지 효율 등급순</option>
								<option value="prod_prc">가격순</option>
								<option value="prod_date">최신순</option>
								<option value="prod_company">제조회사</option>
								<option value="prod_name">상품이름순</option>
								<option value="prod_count">남은순</option>
								{/* 기타 정렬 옵션 */}
							</select>

							{/* 정렬 방식 변경 */}
							<select onChange={(e) => setOrderType(e.target.value)}>
								<option value="asc">오름차순</option>
								<option value="desc">내림차순</option>
							</select>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
			<button onClick={goToPrevPage} disabled={currentPage === 1}>
				이전 페이지
			</button>
			<button onClick={goToNextPage}>다음 페이지</button>
			<div>
				페이지 사이즈:
				<select value={size} onChange={handlePageSizeChange}>
					<option value="1">1</option>
					<option value="5">5</option>
					<option value="10">10</option>
				</select>
			</div>
		</div>
	);
}

export default ProductList;
