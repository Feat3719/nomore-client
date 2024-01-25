import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation"; // 로딩 애니메이션 컴포넌트

function DataFetchingComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await axios.get("your-api-endpoint");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false); // 로딩 종료
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingAnimation />; // 로딩 중일 때 로딩 애니메이션 표시

  return <div>{/* 데이터를 사용하여 UI 렌더링 */}</div>;
}

export default DataFetchingComponent;
