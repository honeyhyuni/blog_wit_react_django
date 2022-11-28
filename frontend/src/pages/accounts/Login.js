import React, {useState} from "react";
import { Input, Form, Button, Card, notification} from "antd";
import {UserOutlined, LockOutlined, SmileOutlined, FrownOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import parseErrorMessages from "pages/utils/ParseError";
import useLocalStorage from "pages/utils/useLocalStorage";
export default function Login() {
    const navigate = useNavigate();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({});
    const onFinish = (values) => {
        console.log("values:" , values)
        async function fn(){
            const {username, password} = values;
            setFieldErrors({});

            const data = {username, password};
            try{
                const response = await Axios.post("http://localhost:8000/accounts/token/", data)
                
                const {data: {access:jwtToken}} = response;
                // console.log("response", jwtToken);
    
                setJwtToken(jwtToken);
                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{color:"#108ee9"}}/>
                })
                navigate("/")
                window.location.reload("/")
            }
            catch(error){
                if(error.response){
                    notification.open({
                        message: "로그인 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    })
                    const {data: fieldsErrorMessages} = error.response
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }

            }
        }
        fn(); 
    };
    return(
        <Card title="로그인" style={{width:"1024px", margin:"0 auto"}}> 
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                    },
          

                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                    {...fieldErrors}
                    >
                    <Input prefix={<UserOutlined/>} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                    {...fieldErrors.password}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
      );
}
const layout = {
    labelCol: {span: 8},
    wrapperCol: {spane: 8}
};


const tailLayout = {
    wrapperCol: {offset:8, span:8}
};