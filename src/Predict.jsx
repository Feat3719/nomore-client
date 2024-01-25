import React, { useState } from "react";

const Predict = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api-flask/predict", {
        // ctcd : "냉장고",
        // user_id : "abf724"

        method: "POST", // POST 요청으로 변경
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ctcd: "냉장고",
          user_id: "abf724",
        }),
      });

      const jsonData = await response.json();

      console.log(jsonData);
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>

      {loading && <p>Loading...</p>}

      {!loading && data.length > 0 && (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <p>Product Name: {item.prod_name}</p>
              <p>Product Price: {item.prod_prc}</p>
              <p>Product Energy: {item.prod_energy}</p>
              <img src={item.prod_img_url} alt={item.prod_name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Predict;
