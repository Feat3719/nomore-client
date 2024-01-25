import axios from "axios"
import { useState } from "react"



const Test = () => {
    const [content, setContent] = useState("");
    const onBtnClick = async () => {
        try {
            const response = await axios.get('/api/test');
            setContent(response.data.data);
            
        } catch (error) {
            alert(error);
        }
    }


return (
    <>
    {content &&<div>{content}</div> }
    
    <button onClick={onBtnClick}>불러오기</button>
    
    </>
);


}

export default Test