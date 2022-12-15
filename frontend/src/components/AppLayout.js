import React, {useState } from "react";
import logo_ from "assets/ani_logo.png"
import {Menu, Input} from "antd";
import "./AppLayout.scss";

import OperateBoardList from "./BoardList/OperateBoardList";
import FreeBoardList from "./BoardList/FreeBoardList";
import InformBoardList from "./BoardList/InformBoardList";
import {useAppContext} from "store";
import AppLayoutHeader from "./AppLayoutHeader";

function AppLayout(){
    // const {store:{jwtToken}} = useAppContext();

    // const headers = {Authorization: `JWT ${jwtToken}`};
    const [value, setValue] = useState(2)
    const [content, setContent] = useState(<FreeBoardList />)
    
   

    const onClick = (value) =>{
        setValue(value)
        if (value===1){
            setContent(<OperateBoardList />)
        }
        else if(value === 2){
            setContent(<FreeBoardList />)
        }
        else{
            setContent(<InformBoardList />)
        }
    }

    return(
        <div className="app">
            <AppLayoutHeader />
            <div className="blog_title"><h1>Honeyhyuni's Blog</h1></div>
        <div className="sub_header">
            <div className="choice_title">
                <Menu mode="horizontal" defaultSelectedKeys={["free"]}>
                    <Menu.Item key="operate" onClick={()=>onClick(1)}>공지사항</Menu.Item>
                    <Menu.Item key="free" onClick={()=>onClick(2)}>자유게시판</Menu.Item>
                    <Menu.Item key="inform" onClick={()=>onClick(3)}>운영게시판</Menu.Item>
                </Menu>
            </div>
            <div className="search"><Input.Search />
            </div>
        </div>
            <div className="contents">
                {content}
            </div>
            <div className="footer">&copy; honeyhyuni_NoticeBoard</div>
        </div>  
    );
}


export default AppLayout;