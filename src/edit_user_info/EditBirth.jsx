import React, { useState, useRef, useEffect } from "react";

const EditBirth = ({ style, onChange }) => {
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const selectYearRef = useRef(null);
  const selectMonthRef = useRef(null);
  const selectDayRef = useRef(null);

  const isYearSelected = useRef(false);
  const isMonthSelected = useRef(false);
  const isDaySelected = useRef(false);

  useEffect(() => {
    const handleYearFocus = () => {
      if (!isYearSelected.current) {
        isYearSelected.current = true;
        const selectYear = selectYearRef.current;

        for (let i = 1940; i <= 2030; i++) {
          const yearOption = document.createElement("option");
          yearOption.setAttribute("value", i);
          yearOption.innerText = i;
          selectYear.appendChild(yearOption);
        }
      }
    };

    const handleMonthFocus = () => {
      if (!isMonthSelected.current) {
        isMonthSelected.current = true;
        const selectMonth = selectMonthRef.current;

        for (let j = 1; j <= 12; j++) {
          const monthOption = document.createElement("option");
          monthOption.setAttribute("value", j);
          monthOption.innerText = j;
          selectMonth.appendChild(monthOption);
        }
      }
    };

    const handleDayFocus = () => {
      if (!isDaySelected.current) {
        isDaySelected.current = true;
        const selectDay = selectDayRef.current;

        for (let k = 1; k <= 31; k++) {
          const dayOption = document.createElement("option");
          dayOption.setAttribute("value", k);
          dayOption.innerText = k;
          selectDay.appendChild(dayOption);
        }
      }
    };

    selectYearRef.current.addEventListener("focus", handleYearFocus);
    selectMonthRef.current.addEventListener("focus", handleMonthFocus);
    selectDayRef.current.addEventListener("focus", handleDayFocus);

    // 정리함수에서 이벤트 리스너 제거
    return () => {
      selectYearRef.current.removeEventListener("focus", handleYearFocus);
      selectMonthRef.current.removeEventListener("focus", handleMonthFocus);
      selectDayRef.current.removeEventListener("focus", handleDayFocus);
    };
  }, []);
  const handleBirthChange = (type, value) => {
    if (type === "year") setBirthYear(value);
    if (type === "month") setBirthMonth(value);
    if (type === "day") setBirthDay(value);

    onChange(type, value);
  };

  return (
    <tr>
      <th>생년월일</th>
      <td>
        <div className={style.select_birth_area}>
          <select
            name="select_year"
            id="select_year"
            className={style.select_year}
            onChange={(e) => handleBirthChange("year", e.target.value)}
            value={birthYear}
          >
            {/* 년도 옵션 생성 */}
          </select>
          <select
            name="select_month"
            id="select_month"
            className={style.select_month}
            onChange={(e) => handleBirthChange("month", e.target.value)}
            value={birthMonth}
          >
            {/* 월 옵션 생성 */}
          </select>
          <select
            name="select_day"
            id="select_day"
            className={style.select_day}
            onChange={(e) => handleBirthChange("day", e.target.value)}
            value={birthDay}
          >
            {/* 일 옵션 생성 */}
          </select>
        </div>
      </td>
    </tr>
  );
};

export default EditBirth;
