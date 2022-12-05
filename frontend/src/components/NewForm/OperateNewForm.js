import React, {useState } from "react";
import {Form, Button, Input, Upload, Modal, notification, Card} from "antd";
import {FrownOutlined, PlusOutlined} from "@ant-design/icons";
import {getBase64FromFile} from "pages/utils/base64"
import { useAppContext } from "store";
import  parseErrorMessages from "pages/utils/ParseError"; 
import { useNavigate  } from "react-router-dom";
import Axios from "axios";
import "./New.scss";

export default function PostNewForm(){
    const navgate = useNavigate();
    const {store:{jwtToken}} = useAppContext();
    const [fileList, setFileList] = useState([]);
    const [fieldErrors, setFieldErrors] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null
    });
    const handleFinish = async fieldValues => {
        const {
          title,
          caption,
          photo: { fileList }
        } = fieldValues;
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("caption", caption);
    
        const headers = { Authorization: `Bearer ${jwtToken}` };
        try {

            const response = await Axios.post("http://localhost:8000/api/operate/", formData, {
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
    
    
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
      };

    const handlePreviewPhoto = async file => {
        if(!file.url && !file.preview){
            file.preview = await getBase64FromFile(file.originFileObj)
        }

        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview
        })
    }
    

    return (
        <div className="OperateNew">
            <Card title="공지사항 새 포스팅 등록">
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
};