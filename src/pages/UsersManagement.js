import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { useState } from "react";
import CreateCategory from "../components/layouts/Categories/CreateCategory";
import CreateFeatures from "../components/layouts/Fetures/CreateFeatures";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import Selectbox from "../components/share/Selectbox";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

const UsersManagement = () => {
  const [users, setusers] = useState()
  const apigetCatList = useFetch({
    method: "get",
    url: "api/User/AllUsers",
    params:{
      pageNumber:1,
      size:10
    },
    noHeader: false,
    trigger: true,
    setter: setusers,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const Option = [
    {
        value:"A",
        label:"A group"
    }
]
  const columns = [
    {
      title: "شماره تماس",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "name",
      key: "name",
      render:(row,record)=>{
        return(
          <div>
{record.firstName} {record.lastname}
          </div>
        )
      }
    },
    
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "نقش کاربر",
      dataIndex: "sender",
      key: "sender",
      render: () => {
        return (
          <div className="flex gap-[20px]">
               <Selectbox
       // label="نقش کاربر"
        option={Option}
      multiple
        // onChange={value => setCo(value)}
         
      /> 
          </div>
        );
      }
    },
    
    
  ];


  return (
    <Card>
       <Title title=' مدیریت کاربران'/>
      <PrimayTable
        dataSource={users}
        columns={columns}
       
      />
      
    </Card>
  );
};


export default UsersManagement