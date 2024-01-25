import styles from "./Header.module.css";

function Header() {
  const go_main = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <div onClick={go_main}>NOMORE</div>
        </div>
        <div className={styles.subtitle}>
          <div>"에너지소비효율등급으로 가전제품 구매하세요"</div>
        </div>
      </div>
    </>
  );
}

export default Header;
