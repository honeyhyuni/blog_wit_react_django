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

    return(
    <div className="commentList">  
        <div className="comment">
            {commentList && commentList.results.map(comment => (
                <Comment key={comment.id} comment={comment}/>
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