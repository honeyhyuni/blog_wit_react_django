import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import {Table, Button} from "antd";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import FreeDetail from "components/DetailForm/FreeDetail";

function FreeBoardList(){
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const handleClick = (e) => {
      navigate("/free/new");
    }
    useEffect(() => {
      async function fetchList(){
      const apiUrl = "http://localhost:8000/api/free/"
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
          key: 'id',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          // onFilter: (value, record) => record.id.indexOf(value) === 0,
          sorter: (a, b) => a.id - b.id,
          // sortDirections: ['descend'],
        },
        {
          title:'Username',
          dataIndex: "username",
          key:'username',
        },
        {
          title: 'Title',
          dataIndex: 'title',
  
          render: (text, record) => <Link to={`free/${record.id}`}>{text}</Link>,
          key: 'title',
        },
        {
          title: 'Created_at',
          key: 'create_at',
          // onFilter: (value, record) => record.address.indexOf(value) === 0,
          sorter: {
            compare: (a, b) =>
              moment(a.created_at, "DD-MM-YYYY") - moment(b.created_at, "DD-MM-YYYY"),
          },
          render: (record) => {
            return (
                <p>{moment(record.created_at).format("YYYY-MM-DD")}</p>
            );
          }
        }
      ]
      const data = []
      post.map(p => {
        const {author, created_at, title, caption, id} = p
        const {username, name} = author || "username"
        data.push({created_at, title, caption, id, username, name})
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


export default FreeBoardList;