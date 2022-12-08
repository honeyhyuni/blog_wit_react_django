import React, {useState} from 'react';
import {Input, Collapse, Image, Button, Modal} from  "antd";
import moment from 'moment';
import "./Detail.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import FreeDetailUpdateForm from './DetailForm/DetailUpdateForm/FreeDetailUpdateForm';
import Axios from 'axios';
import { useAppContext } from 'store';
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

export default function DetailForm({post, handleLike}){
    const { Panel } = Collapse;
    const {author, id, created_at, caption, title, is_like} = post
    const {username, name, photo} = author || "username"
    const location = useLocation();
    const navigate = useNavigate();
    const {store:{jwtToken}} = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const onClick = (e) => {
        async function fetchList(){
        const apiUrl = "http://localhost:8000/accounts/userbyme"
        await Axios.get(apiUrl, {headers})
        .then(response => {

            const {data} = response;
            if(data[0].username === username){
                navigate(`${location.pathname}/update`)
            }
            else{
                alert("이글의 작성자가 아닙니다.")   
            }
        })
        .catch(error => {
            console.log(error)
        })
        }
        fetchList()
    }
    const heartClick = (e) => {
        if(is_like){
            handleLike({post, isLike:false})
        }
        else{
            handleLike({post, isLike:true})
        }
    }
    
    
    
     return(
       <div className='DetailApp'>
                <div>  
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="제목" key="1">
                        <p>{title}</p>
                    </Panel>
                    <Panel header="작성자" key="2">
                        <p>{username}</p>
                    </Panel>
                    <Panel header="작성일" key="3">
                        <p>{moment(created_at).format("YYYY-MM-DD")}</p>
                    </Panel>
                </Collapse> </div>
                <div className='card_area'>
                    <Image hoverable src={photo} alt={name} width="248px" height="248px"/>  

                    {/* <Image hoverable src={logo_} alt={name} width="248px" height="248px"/>  } */}
                </div>
                <div className='text_area'>
                    <Input.TextArea  value={caption} style={{fontSize:"20px", maxBlockSize:"100%"}} readOnly={true}/>
                </div>
                <div className='footer'>
                    {/* <Button size='large' type='primary' style={{marginRight:"0.25em", float:"right"}} onClick={() => {navigate(`${location.pathname}/update`)}}>수정하기</Button> */}
                    <Button size='large' type='ghost' style={{marginRight:"0.25em", float:"right"}} onClick={heartClick}>
                    {is_like? "좋아요 취소" : "좋아요"} {is_like? (<HeartTwoTone twoToneColor="#eb2f96" />) :  <HeartOutlined />}
                    </Button> 
                    <Button size='large' type='primary' style={{marginRight:"0.25em", float:"right"}} onClick={onClick}>수정하기</Button>
                    <Button size='large' type='primary' onClick={() => {navigate("/")}} >목록으로</Button>
                </div>
                </div>
                    
 
    )
}