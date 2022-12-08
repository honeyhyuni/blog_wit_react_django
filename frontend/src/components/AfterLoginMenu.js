import React, {useEffect, useState} from "react";
import {Menu} from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAppContext } from "store";
import useLocalStorage from "pages/utils/useLocalStorage";

export default function AfterLoginMenu(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [outToken, setOutJwtToken] = useLocalStorage("jwtToken", "")
    const {store:{jwtToken}} = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    
    useEffect(() => {
        async function fetchList(){
        const apiUrl = "http://localhost:8000/accounts/userbyme"
        await  Axios.get(apiUrl, {headers})
        .then(response => {
            const {data} = response;
            setUser(data)
        })
        .catch()
        }
        fetchList()
      }, [])
    const username = (user[0] && user[0].username)
    const onClick = (value) => { 
        if(value === 1){
            navigate("accounts/update_profile")
        }
        else if(value === 2){
            setOutJwtToken("")
            navigate("/")
            window.location.reload("/")
        }
        else{
            navigate("accounts/logout/")
        }
    }
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="signup" onClick={() => onClick(1)}>{username}</Menu.Item>
                <Menu.Item key="login" onClick={() => onClick(2)}>로그아웃</Menu.Item>
                <Menu.Item key="zz" onClick={() => onClick(3)}>회원탈퇴</Menu.Item>
            </Menu>
        </div>
    );
}