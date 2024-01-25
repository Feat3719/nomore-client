import styles from "./Productlist.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../navigation/Nav";
import Header from "../header/Header";
import { useParams } from "react-router-dom";

// 프로덕트 카테고리페이지에 나열되어있는 프로덕트 리스트창

function Productlist() {
  const [data, setData] = useState(null);
  const { category } = useParams();

  const [selectCategory, setSelectCategory] = useState(category);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorter, setSorter] = useState("prod_energy");
  const [orderType, setOrderType] = useState("ASC");
  const [pageSize, setPageSize] = useState("10");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const url = `/api/category?categoryId=${selectCategory}&page=${currentPage}&sorter=${sorter}&orderType=${orderType}&size=${pageSize}`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectCategory, currentPage, sorter, orderType, pageSize]); // currentPage 또는 pageSize가 변경될 때마다 useEffect가 실행됩니다.

  //selectCategoryId => C001,~C006
  //sorter =>prod_energy,...
  //orderType =>acs, desc

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };
  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  return (
    <>
      <div>
        {data ? (
          <div>
            {" "}
            <div>
              <div className={styles.product_list}>
                {" "}
                {data.map((product, index) => (
                  <div className={styles.product_box} key={index}>
                    <Link
                      to={`/Productdetail/${selectCategory}/${product.prodId}`}
                      key={index}
                    >
                      <a className={styles.lista} href="#">
                        <img
                          className={styles.product_image}
                          src={product.prodImgUrl}
                          alt="상품 이미지"
                        />
                      </a>
                    </Link>
                    <Link
                      to={`/Productdetail/${selectCategory}/${product.prodId}`}
                      key={index}
                    >
                      <div className={styles.product_name}>
                        {product.prodName}
                      </div>
                      <div className={styles.product_rating}>
                        에너지소비효율등급 {product.prodEnergy}등급
                      </div>
                      <div className={styles.product_price}>
                        {product.prodPrc}원
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.foot_button}>
              <div>
                {/* 카테고리 변경 */}
                <select onChange={(e) => setSelectCategory(e.target.value)}>
                  <option value="C001">C001</option>
                  <option value="C002">C002</option>
                  <option value="C003">C003</option>
                  <option value="C004">C004</option>
                  <option value="C005">C005</option>
                  {/* 기타 카테고리 옵션 */}
                </select>

                {/* 페이지 크기 변경 */}
                <select onChange={handlePageSizeChange}>
                  <option value="20">20개씩 보기</option>
                  <option value="40">40개씩 보기</option>
                  {/* 기타 페이지 크기 옵션 */}
                </select>
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

                {/* 페이지 변경 */}
                <button className={styles.foot_button} onClick={goToPrevPage}>
                  이전 페이지
                </button>
                <button className={styles.foot_button} onClick={goToNextPage}>
                  다음 페이지
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Productlist;
