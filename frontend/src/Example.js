import React, { useState } from "react";
import Axios from "axios";

function Example(){
    const [post, setPost] = useState([]);
    const [post2, setPost2] = useState([]);
    const apiUrl = "http://localhost:8000/api/freeb/like/";
    const apiUrl2 = "http://localhost:8000/api/informb/";
    Axios.get(apiUrl)
    .then(response => {
        const {data} = response;
        setPost(data)
    })
    .catch()

    // Axios.get(apiUrl2)
    // .then(response => {
    //     const {data} = response;
    //     setPost2(data)
    // })
    // .catch()


    return(
        <div>
            hellowwwww
            {post.map(p => (
                <div>{JSON.stringify(p)}</div>
            ))}
            {/* {post2.map(p => (
                <div>{JSON.stringify(p)}</div>
            ))} */}
        </div>
    )
}


export default Example;