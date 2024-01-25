import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "./Animation - 1706185275234";
import styles from "./Loading.module.css"; // CSS 모듈 임포트

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LoadingAnimation = () => {
  const [animationState, setAnimationState] = useState("fadeIn");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState("fadeOut");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "transparent", // 배경색 투명하게 설정
      }}
      className={animationState === "fadeIn" ? styles.fadeIn : styles.fadeOut}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default LoadingAnimation;
