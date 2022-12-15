import React from "react";
import moment from "moment";
import { Tooltip, Avatar } from 'antd';
import { Comment as AntdComment } from '@ant-design/compatible';

export default function Comment({comment}){
    const {author, message, updated_at} = comment;
    const {username, name, photo} = author;
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
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format(updated_at)}>
                    <span>{moment(updated_at).fromNow()}</span>
                    </Tooltip>
                }/>
            </div>
    );
}