import React from "react";
import logo_ from "assets/ani_logo.png"
import {Menu, Input, Button} from "antd";
import "./AppLayout.scss";
import Signup from "pages/accounts/Signup";
import { useNavigate } from "react-router-dom";

function AppLayout({children}){
    const navigate = useNavigate();
    const onClick = (value) => { 
        console.log(value)
        if(value === 1){
            navigate("accounts/signup/")
        }
    }
    return(
        <div className="app">
            <div className="header">
                <h1 className="page-title"><img src={logo_} alt="logo" style={{width:"120px"}}></img></h1>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item onClick={() => onClick(1)}>회원가입</Menu.Item>
                        <Menu.Item>로그인</Menu.Item>
                        <Menu.Item>비밀번호 찾기</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="blog_title"><h1>Honeyhyuni's Blog</h1></div>
        <div className="sub_header">
            <div className="choice_title">
                <Menu mode="horizontal" defaultSelectedKeys={["free"]}>
                    <Menu.Item key="free">공지사항</Menu.Item>
                    <Menu.Item key="operate">자유게시판</Menu.Item>
                    <Menu.Item key="notice">운영게시판</Menu.Item>
                </Menu>
            </div>
            <div className="search"><Input />
            </div>
        </div>
            <div className="contents">{children}</div>
            <div className="footer">&copy; honeyhyuni_NoticeBoard</div>
        </div>  
    );
}



export default AppLayout;