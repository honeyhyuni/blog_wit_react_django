import React, {useState} from "react";
import { Input, Form, Button, Card, Select, InputNumber, notification} from "antd";
import {UserOutlined, LockOutlined, PhoneOutlined, SmileOutlined, FrownOutlined} from "@ant-design/icons";
import parseErrorMessages from "pages/utils/ParseError";
// import { useAxios } from "use-axios";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
    
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({});
    const onFinish = (values) => {
        console.log("values:" , values)
        async function fn(){
            const {username, password, first_name, last_name, age, gender, phone_number} = values;
            setFieldErrors({});

            const data = {username, password, age, gender, phone_number, first_name, last_name};
            try{
                await Axios.post("http://localhost:8000/accounts/signup/", data)
                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{color:"#108ee9"}}/>
                })
                navigate("/accounts/login");
            }
            catch(error){
                if(error.response){
                    notification.open({
                        message: "회원가입 실패",
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
        <Card title="회원가입" style={{width:"1024px", margin:"0 auto"}}> 
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                onFinish={onFinish} // submit 직후 호출됨
                // onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[                    
                    {
                        required: true,
                    },
                    {
                        min:6, message: "아이디를 6자리 이상 입력해주세요."
                    }
                    // { pattern: /^[a-zA-Z]+[0-9]+$/, message: '아이디를 6자리 이상 영어와 숫자 조합으로 입력해주세요.'},
          

                    ]}
                    hasFeedback
                    {...fieldErrors.username}
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
                    {
                        pattern: /^[a-zA-Z]+[0-9]+$/, message: '비밀번호를 영어와 숫자 조합으로 입력해주세요.'
                    },
                    {
                        min:6, message: "비밀번호를 6자리 이상 입력해주세요."
                    },
                    ]}
                    {...fieldErrors.password}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>


                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('위에 입력하신 비밀번호와 다릅니다.'));
                        },
                    }),
                    ]}
                >

        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password"/>
        </Form.Item>
        <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                    {...fieldErrors.first_name}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                    {...fieldErrors.last_name}
                >
                    <Input />
      </Form.Item>

                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                          type: 'number',
                          min: 0,
                          max: 99,
                        },
                      ]}
                    hasFeedback
                    {...fieldErrors.age}
                    >
                    <InputNumber defaultValue={15}/>
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                    {
                        required: true,
                        message: 'Please Choice One',
                    },
                    ]}
                    hasFeedback
                    {...fieldErrors.gender}
                    >
        
                    <Select>
                        <Select.Option value="M">남성</Select.Option>
                        <Select.Option value="F">여성</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[
                    {
                        required: true,
                    },
                    {
                        len:11, message: "휴대폰 번호 11 자리를 입력해주세요.",
                    },
        
                    ]}
                    hasFeedback
                    {...fieldErrors.phone_number}
                    >
                    <Input prefix={<PhoneOutlined/>} placeholder='"-" 없이 11자리를 입력해주세요'/>
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