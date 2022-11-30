import React, { useEffect, useState } from "react";
import Axios from "axios";
import {Button, Table} from "antd";
import moment from 'moment';
import useAxios from "use-axios";
import PostNewForm from "./OperateNewForm";
import { useNavigate } from "react-router-dom";

function OperateBoardList(){
    const navigate = useNavigate();
    const [post, setPost] = useState([]);



    const handleClick = (e) => {
      navigate("/operate/new");
  }

    useEffect(() => {
      async function fetchList(){
      const apiUrl = "http://localhost:8000/api/operate/"
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
          key: 'key',
        },
        {
          title: 'Created_at',
          key: 'key',
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
      const {author, created_at, title, caption, id, photo} = p
      const {username, name} = author
      data.push({created_at, title, caption, id, username, name, photo})
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


export default OperateBoardList;