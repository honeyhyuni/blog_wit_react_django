import React, {useState} from "react";
import { Input, Form, Button, Card} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";


export default function Login() {
  
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
          

                    ]}
                    hasFeedback
                    // {...fieldErrors.username}
                    // {...fieldErrors.non_field_errors}
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
                    // {...fieldErrors.password}
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