import React from 'react';
import {Card, Input, Collapse, Image} from  "antd";
import moment from 'moment';
import "./Detail.scss"
import logo_ from "assets/ani_logo.png"
import AppLayoutHeader from './AppLayoutHeader';

export default function DetailForm({post}){
    const { Panel } = Collapse;
    const {author, id, created_at, caption, title} = post
    const {username, name, photo} = author || "username"
     return(
       <div className='DetailApp'>
        <AppLayoutHeader />
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
                <Input.TextArea  value={caption} readOnly style={{fontSize:"20px"}}/>
            </div>
    </div> 
 
    )
}