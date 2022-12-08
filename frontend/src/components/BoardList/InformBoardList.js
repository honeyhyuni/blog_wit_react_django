import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Table, Button} from "antd";
import moment from "moment";
import { useNavigate, Link } from "react-router-dom";

function InformBoardList(){
    const [post, setPost] = useState([]);
    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate("inform/new")
    }
    useEffect(() => {
      async function fetchList(){
      const apiUrl = "http://localhost:8000/api/inform/"
      await  Axios.get(apiUrl)
      .then(response => {
          const {data} = response;
          setPost(data)
      })
      .catch()
      }
      fetchList()
    }, [])

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'key',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          // onFilter: (value, record) => record.id.indexOf(value) === 0,
          sorter: (a, b) => a.id - b.id,
          // sortDirections: ['descend'],
        },
        {
          title:'Username',
          dataIndex: 'username',
          key:'key',
        },
        {
          title: 'Title',
          dataIndex: 'title',
          render: (text, record) => <Link to={`inform/${record.id}`}>{text}</Link>,
          key: 'key',
        },
        {
          title: 'Created_at',
          key: 'key',
          // onFilter: (value, record) => record.address.indexOf(value) === 0,
          sorter: {
            compare: (a, b) =>
              moment(a.created_at, "YYYY-MM-DD") - moment(b.created_at, "YYYY-MM-DD"),
          },
          render: (record) => {
            return (
                <p>{moment(record.created_at).format("YYYY-MM-DD")}</p>
            );
          }
        },
        {
          title: 'Updated_at',
          key: 'updated_at',
          // onFilter: (value, record) => record.address.indexOf(value) === 0,
          sorter: {
            compare: (a, b) =>
              moment(a.updated_at, "YYYY-MM-DD") - moment(b.updated_at, "YYYY-MM-DD"),
          },
          render: (record) => {
            return (
                <p>{moment(record.updated_at).format("YYYY-MM-DD")}</p>
            );
          }
        },
        {
          title: '좋아요갯수',
          dataIndex: 'get_like_length',
          key: 'get_like_length',
          sorter: {
            compare: (a, b) =>
              a.get_like_length - b.get_like_length
          },
        },
      ]
      const data = []
      post.map(p => {
        const {author, created_at, title, caption, id, photo, updated_at, get_like_length} = p
        const {username, name} = author
        data.push({created_at, title, caption, id, username, name, photo, updated_at, get_like_length})
      })
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

    return(
    <div>
        <Button type="primary" style={{marginBottom:"1em"}} onClick={handleClick}>새 포스팅 쓰기</Button>
        <Table columns={columns} dataSource={data} onChange={onChange} pagination={{pageSize: 10}}/>
    </div>
    )
}


export default InformBoardList;