import React from "react";
import {Menu} from "antd";
import { useNavigate } from "react-router-dom";

export default function AfterLoginMenu(){
    const navigate = useNavigate();
    const onClick = (value) => { 
        if(value === 1){
            navigate("accounts/signup/")
        }
        else if(value === 2){
            navigate("accounts/logout/")
        }
        else{
            navigate("accounts/logout/")
        }
    }
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="signup" onClick={() => onClick(1)}>username</Menu.Item>
                <Menu.Item key="login" onClick={() => onClick(2)}>로그아웃</Menu.Item>
                <Menu.Item key="zz" onClick={() => onClick(3)}>회원탈퇴</Menu.Item>
            </Menu>
        </div>
    );
}