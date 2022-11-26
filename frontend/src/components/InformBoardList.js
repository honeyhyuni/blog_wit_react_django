import React, { useState } from "react";
import Axios from "axios";

function InformBoardList(){
    const [post, setPost] = useState([]);
    const apiUrl = "http://localhost:8000/api/informb/";
    Axios.get(apiUrl)
    .then(response => {
        const {data} = response;
        setPost(data)
    })
    .catch()
    return(
        <div>
            공지사항
            {post.map(p => (
                <div>{JSON.stringify(p)}</div>
            ))}
        </div>
    )
}


export default InformBoardList;