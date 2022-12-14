import React, {useEffect, useState} from "react";
import {Menu, Modal, message} from "antd";
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
        const apiUrl = "http://localhost:8000/accounts/userbyme/"
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
                <Menu.Item key="userbyme" onClick={() => onClick(1)}>{username}</Menu.Item>
                <Menu.Item key="logout" onClick={() => onClick(2)}>๋ก๊ทธ์์</Menu.Item>
                <Menu.Item key="deleteuser" onClick={showModal}>ํ์ํํด</Menu.Item>
            </Menu>
            <Modal title="ํ์ ํํด" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                ํ์ ํํด๋ฅผ ํ์๊ฒ?์ต๋๊น??
            </Modal>
        </div>
    );
}