import React, {useState, useEffect} from "react";
import { Input, Form, Button, Card, Select, InputNumber, notification, Upload, Modal} from "antd";
import {UserOutlined, PhoneOutlined, SmileOutlined, FrownOutlined, PlusOutlined} from "@ant-design/icons";
import parseErrorMessages from "pages/utils/ParseError";
// import { useAxios } from "use-axios";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useAppContext } from "store";
import {getBase64FromFile} from "pages/utils/base64";

export default function UpdateProfile() {
    const [user, setUser] = useState([]);
    const {store:{jwtToken}} = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [fileList, setFileList] = useState([]);
    const [fieldErrors, setFieldErrors] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null
    });
    
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
    const {id, username, first_name, last_name, age, gender, phone_number, photo} = user[0] || "user"

    console.log(photo)
    console.log(fileList)
    
    const fields = [
        { name: ['username'], value: username },
        { name: ['first_name'], value: first_name},
        { name: ['last_name'], value: last_name},
        { name: ['age'], value: age},
        { name: ['gender'], value: gender},
        { name: ['phone_number'], value: phone_number},
      ];

    const navigate = useNavigate();
    const handleFinish = async fieldValues => {
        const {
            username,
            first_name,
            last_name,
            age,
            gender,
            phone_number,
            photo: { fileList }
        } = fieldValues;

        const formData = new FormData();
        formData.append("username", username);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("phone_number", phone_number);
        fileList && fileList.forEach(file => {
          formData.append("photo", file.originFileObj);
        });
        // !fileList && formData.append("photo", photo)
        const headers = { Authorization: `Bearer ${jwtToken}` };
        try {
          const response = await Axios.put(`http://localhost:8000/accounts/update_profile/${id}/`, formData, {
            headers
          });
          console.log("success response :", response);
          navigate("/");
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
    return(
        <Card title="프로필 수정" style={{width:"1024px", margin:"0 auto"}}> 
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                onFinish={handleFinish} // submit 직후 호출됨
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                fields={fields}
                >
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
                    <Input prefix={<UserOutlined/>} placeholder="Username" readOnly={true} />
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

                <Form.Item
                        label="Photo"
                        name="photo"
                        // rules={[{ required: true, message: "사진을 입력해주세요." }]}
                        hasFeedback
                        {...fieldErrors.photo}
                    >
                        <Upload
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={() => {
                            return false;
                        }}
                        onChange={handleUploadChange}
                        onPreview={handlePreviewPhoto}
                        >
                        {fileList.length > 0 ? null : (
                            <div>
                                <PlusOutlined />
                            <div className="ant-upload-text">Upload</div>
                            </div>
                            // <img src={photo} alt="username"/>
                        )}
                        </Upload>
                    </Form.Item>

                

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                <Modal
            visible={previewPhoto.visible}
            footer={null}
            onCancel={() => setPreviewPhoto({ visible: false })}
          >
            <img
              src={previewPhoto.base64}
              style={{ width: "100%" }}
              alt="Preview"
            />
          </Modal>
                 
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