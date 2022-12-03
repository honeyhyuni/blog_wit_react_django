import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAppContext } from "store";
import {Button, Form, Input, Card, notification} from "antd";
import {FrownOutlined} from "@ant-design/icons";
import parseErrorMessages from "pages/utils/ParseError";

export default function OperateDetailUpdateForm(){
    const {user_id} = useParams()
    const navgate = useNavigate();
    const {store:{jwtToken}} = useAppContext();
    const [fieldErrors, setFieldErrors] = useState([]);

    const handleFinish = async fieldValues => {
        const {
          title,
          caption,
        } = fieldValues;
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("caption", caption);
    
        const headers = { Authorization: `Bearer ${jwtToken}` };
        try {

            const response = await Axios.patch(`http://localhost:8000/api/operate/${user_id}/`, formData, {
            headers
          });
          console.log("success response :", response);
          navgate("/");
        } catch (error) {
          if (error.response) {
            const { status, data: fieldsErrorMessages } = error.response;
            if (typeof fieldsErrorMessages === "string") {
                notification.open({
                message: "서버 오류",
                description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
                icon: <FrownOutlined style={{ color: "#ff3333" }} />
              });
            } else {
              setFieldErrors(parseErrorMessages(fieldsErrorMessages));
            }
          }
        }
      };
    
    return(
        <div className="OperateNew">
            <Card title="포스팅 수정">
            <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>
            <Form.Item
                label="TITLE"
                name="title"
                rules={[{ required: true, message: "제목을 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.title}
                {...fieldErrors.non_field_errors}
            >
                <Input />
            </Form.Item>
        
            <Form.Item
                label="CAPTION"
                name="caption"
                rules={[{ required: true, message: "내용을 입력해주세요." }]}
                hasFeedback
                {...fieldErrors.caption}
            >
                <Input.TextArea />
            </Form.Item>
        
        
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        
                </Form>
            </Card>
    </div>
    );
}

const layout = {
    labelCol: {span: 8},
    wrapperCol: {spane: 16}
};


const tailLayout = {
    wrapperCol: {offset:8, span:16}
    
}