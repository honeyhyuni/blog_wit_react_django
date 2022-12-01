import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import {Card} from  "antd";
import DetailForm from 'components/DetailForm';
import { useAxios } from 'use-axios';
function OperateDetail() {
  const {user_id}  = useParams("");
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function fetchList(){
    const apiUrl = `http://localhost:8000/api/operate/${user_id}`
    await Axios.get(apiUrl)
    .then(response => {
        const {data} = response;
        setPost(data)
        console.log(data.data)
    })
    .catch()
    }
    fetchList()
  },[])


  return (
    <div>
       <DetailForm post={post}/>
    </div>
   )
}

export default OperateDetail;