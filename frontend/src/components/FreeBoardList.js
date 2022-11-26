import React, { useState } from "react";
import Axios from "axios";

function Example(){
    const [post, setPost] = useState([]);
    const apiUrl = "http://localhost:8000/api/freeb/";
    Axios.get(apiUrl)
    .then(response => {
        const {data} = response;
        setPost(data)
    })
    .catch()



    return(
        <div>
            자유게시판
            {post.map(p => (
                <div>{JSON.stringify(p)}</div>
            ))}
        </div>
    )
}


export default Example;