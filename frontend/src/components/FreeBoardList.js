import React, { useState } from "react";
import Axios from "axios";
import moment from "moment";
import {Table} from "antd";

function Example(){
    const [post, setPost] = useState([]);
    const apiUrl = "http://localhost:8000/api/freeb/";
    Axios.get(apiUrl)
    .then(response => {
        const {data} = response;
        setPost(data)
    })
    .catch()

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
          dataIndex: 'author',
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
    const data = [...post]
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };



    return(
        <div>
            <Table columns={columns} dataSource={data} onChange={onChange} pagination={{pageSize: 10}}/>
        </div>
        )
}


export default Example;