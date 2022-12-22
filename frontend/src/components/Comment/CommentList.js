import {Input, Button, Pagination } from "antd"
import React, { useState } from "react";
import { useAppContext } from "store";
import useAxios from "axios-hooks";
import Comment from "./Comment";
import Axios from "axios";
import { useLocation } from "react-router-dom";

export default function CommentList(){
    const location = useLocation();
    const {store:{jwtToken}} = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [page, setPage] = useState(1)
    
    const [commentContent, setCommentContent] = useState("");

    const [{data:commentList, loading, error}, refetch] = useAxios({
        url:`http://localhost:8000/api${location.pathname}/comments/?page=${page}`,
        headers,
        
    });

    const [{data:user, loading2, error2}, refetch2] = useAxios({
        url:`http://localhost:8000/accounts/userbyme/`,
        headers,
        
    });
    const login_user = user && user[0].username
    
    
    const handleCommentSave = async () => {
        const apiUrl = `http://localhost:8000/api${location.pathname}/comments/`
        try{
            await Axios.post(apiUrl, {message: commentContent}, {headers});
            refetch();
            setCommentContent("");
        }
        catch(error){
            console.log('error', error)
        }
    }
    
    const onChange = (e) => {
        setPage(e)
    }

    // 댓글 삭제
    const onClick_delete = async ({comment}) => {
        const apiUrl = `http://localhost:8000/api${location.pathname}/comments/${comment.id}`;
        try{
            const response = await Axios.delete(apiUrl,{headers})
            refetch()
        }
        catch(error){
    
        }
    }


    return(
    <div className="commentList">  
        <div className="comment">
            {commentList && commentList.results.map(comment => (
                <Comment key={comment.id} comment={comment} login_user={login_user} onClick_delete={onClick_delete} />
            ))}
        </div>
            <Input.TextArea className="input_comment" style={{marginBottom: "0.5em"}}
                onChange={e => setCommentContent(e.target.value)}
                value={commentContent}/>
            <Button className="button_comment" block type="primary" 
                disabled={(commentContent.trim()).length===0}
                onClick={handleCommentSave}>
                댓글 쓰기
            </Button>
            <Pagination
                showSizeChanger
                defaultCurrent={1}
                total={commentList && commentList.count}
                onChange={onChange}
                />
    </div>
    );
}