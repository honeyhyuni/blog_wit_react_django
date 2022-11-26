import React from "react";
import {Menu} from "antd";
import { useNavigate } from "react-router-dom";

export default function BeforeLoginMenu(){
    const navigate = useNavigate();
    const onClick = (value) => { 
        console.log("회원가입:", value)
        if(value === 1){
            navigate("accounts/signup/")
        }
        else if(value === 2){
            navigate("accounts/login/")
        }
        else{
            navigate("accounts/logout/")
        }
    }
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="signup" onClick={() => onClick(1)}>회원가입</Menu.Item>
                <Menu.Item key="login" onClick={() => onClick(2)}>로그인</Menu.Item>
                <Menu.Item key="zz" onClick={() => onClick(3)}>비밀번호 찾기</Menu.Item>
            </Menu>
        </div>
    );
}