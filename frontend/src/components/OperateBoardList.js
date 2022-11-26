import React, { useState } from "react";
import Axios from "axios";
import {Table} from "antd";

function OperateBoardList(){
    const [post, setPost] = useState([]);
    const apiUrl = "http://localhost:8000/api/operateb/";
    Axios.get(apiUrl)
    .then(response => {
        const {data} = response;
        setPost(data)
        // setPost(data)
    })
    .catch()
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        //   filters: [
        //     {
        //       text: 'Joe',
        //       value: 'Joe',
        //     },
        //     {
        //       text: 'Jim',
        //       value: 'Jim',
        //     },
        //     {
        //       text: 'Submenu',
        //       value: 'Submenu',
        //       children: [
        //         {
        //           text: 'Green',
        //           value: 'Green',
        //         },
        //         {
        //           text: 'Black',
        //           value: 'Black',
        //         },
        //       ],
        //     },
        //   ],
      
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.id.length - b.id.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Caption',
          dataIndex: 'caption',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Created_at',
          dataIndex: 'created_at',
          filters: [
            {
              text: 'London',
              value: 'London',
            },
            {
              text: 'New York',
              value: 'New York',
            },
          ],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
      ];
      
      const data = []
      post.map(p => {
        data.push(p)
      })
      
        // {
        //   key: '1',
        //   name: 'John Brown',
        //   age: 32,
        //   address: 'New York No. 1 Lake Park',
        // },
        // {
        //   key: '2',
        //   name: 'Jim Green',
        //   age: 42,
        //   address: 'London No. 1 Lake Park',
        // },
        // {
        //   key: '3',
        //   name: 'Joe Black',
        //   age: 32,
        //   address: 'Sidney No. 1 Lake Park',
        // },
        // {
        //   key: '4',
        //   name: 'Jim Red',
        //   age: 32,
        //   address: 'London No. 2 Lake Park',
        // },
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
    return(
        <div>
            {/* 공지사항
            {post.map(p  => (
                <div>{JSON.stringify(p)}</div>
                
            ))} */}


    <Table columns={columns} dataSource={data} onChange={onChange} pagination={{pageSize: 10}}/>;
    
</div>
    )
}


export default OperateBoardList;