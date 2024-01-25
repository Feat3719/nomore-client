import { useEffect } from "react";
import style from "./css/EditUserInfo.module.css";
import EditUserInfoInputArea from "./EditUserInfoInputArea";

function EditUserInfo() {
  useEffect(()=> {
    
  },[])
  const go_main = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className={style.background}>
        <div className={style.header_area}>
          <div className={style.logo_area}>
            <div onClick={go_main} className={style.main_logo}>
              NOMORE
            </div>
          </div>
          <EditUserInfoInputArea style={style} />
        </div>
      </div>
    </>
  );
}

export default EditUserInfo;
