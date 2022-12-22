import React, {useState} from "react";
import moment from "moment";
import { Tooltip, Avatar, Button, Modal, Card, Form, Input } from 'antd';
import { Comment as AntdComment } from '@ant-design/compatible';

export default function Comment({comment, login_user, onClick_delete}){
    const {author, message, updated_at} = comment;
    const {username, name, photo} = author;
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);



    // 댓글 삭제 모달 처리 및 UI
    const onClick_d = (e) => {
        onClick_delete({comment})
    }
      const showModalDelete = () => {
        setIsModalOpenDelete(true);
      };
    
      const handleOkDelete = () => {
        setIsModalOpenDelete(false);
        onClick_d()
      };
    
      const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
      };
    
    

    return(
        <div>
            <AntdComment author={name.length===0?username:name}
                avatar={
                    <Avatar
                    src={photo}
                    alt={name.length===0?username:name}
                    />
                }
                content={
                    <p>
                        {message}
                        {login_user === username ? <Button danger size="small" style={{float:"right"}} onClick={showModalDelete}>삭제</Button> : null}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format(updated_at)}>
                    <span>{moment(updated_at).fromNow()}</span>
                    </Tooltip>
                }
                />
                <Modal title="댓글 삭제" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete} >
                        삭제하시겠습니까?
                </Modal>
            </div>
    );
}