import React, {useEffect, useState} from "react";
import {Menu, Modal} from "antd";
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    
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
      
      const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        const apiUrl = `http://localhost:8000/accounts/userbyme/${user_id}/`
        console.log(apiUrl)
        Axios.delete(apiUrl, {headers})
        .then(response => {
        })
        .catch()
        setIsModalOpen(false);
        setOutJwtToken("")
        window.location.reload("/")
        
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    const username = (user[0] && user[0].username)
    const user_id = (user[0] && user[0].id)
    const onClick = (value) => { 
        if(value === 1){
            navigate("accounts/update_profile")
        }
        else if(value === 2){
            setOutJwtToken("")
            navigate("/")
            window.location.reload("/")
        }
    }
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="signup" onClick={() => onClick(1)}>{username}</Menu.Item>
                <Menu.Item key="login" onClick={() => onClick(2)}>로그아웃</Menu.Item>
                <Menu.Item key="zz" onClick={showModal}>회원탈퇴</Menu.Item>
            </Menu>
            <Modal title="회원 탈퇴" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                회원 탈퇴를 하시겠습니까??
            </Modal>
        </div>
    );
}