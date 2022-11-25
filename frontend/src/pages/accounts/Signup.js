import React, {useState} from "react";
import { Input, Form, Button, Card, Select} from "antd";



export default function Signup() {
  
    return(
        <Card title="로그인" style={{width:"1024px", margin:"0 auto"}}> 
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                // onFinish={onFinish} // submit 직후 호출됨
                //   onFinishFailed={onFinishFailed}
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
                    // {...fieldErrors.username}
                    // {...fieldErrors.non_field_errors}
                    >
                    <Input />
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
                    // {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Check Password"
                    name="password2"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    // {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="age"
                    name="age"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                    hasFeedback
                    // {...fieldErrors.username}
                    // {...fieldErrors.non_field_errors}
                    >
                    <Input />
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
                    // {...fieldErrors.username}
                    // {...fieldErrors.non_field_errors}
                    >
        
                    <Select>
                        <Select.Option value="M">Male</Select.Option>
                        <Select.Option value="F">Female</Select.Option>
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
                    // {...fieldErrors.username}
                    // {...fieldErrors.non_field_errors}
                    >
                    <Input placeholder='"-" 없이 11자리를 입력해주세요'/>
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