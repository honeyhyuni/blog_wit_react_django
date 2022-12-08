import React from 'react';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import DetailForm from 'components/DetailForm';
import {useAppContext} from "store";
import useAxios from 'axios-hooks';

function OperateDetail() {
  const {user_id}  = useParams("");
  const {store:{jwtToken}} = useAppContext();
  const headers = { Authorization: `Bearer ${jwtToken}` };
  const [{data:post, loading, error}, refetch] = useAxios({
    url:`http://localhost:8000/api/operate/${user_id}`,
    headers,
  });


  const handleLike = async ({post, isLike}) => {
    const apiUrl = `http://localhost:8000/api/operate/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE"
    try{
        const response = await Axios(
            {
                url: apiUrl,
                method,
                headers,
            }
        )
        refetch()
    }
    catch(error){

    }
}

  return (
    <div>
       {post && <DetailForm post={post} handleLike={handleLike}/>}
    </div>
   )
}

export default OperateDetail;