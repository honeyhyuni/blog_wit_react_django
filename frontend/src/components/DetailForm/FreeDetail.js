import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import Axios from 'axios';
import {Card} from  "antd";
import DetailForm from 'components/DetailForm';
import { useAxios } from 'use-axios';
import {useAppContext} from "store";
function FreeDetail() {
  const {user_id}  = useParams("");
  const [post, setPost] = useState([]);
  const {store:{jwtToken}} = useAppContext();
  const headers = { Authorization: `Bearer ${jwtToken}` };
  useEffect(() => {
    async function fetchList(){
    const apiUrl = `http://localhost:8000/api/free/${user_id}`
    await Axios.get(apiUrl, headers)
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

export default FreeDetail;