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
import Selectbox from "../components/share/Selectbox";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
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
  const Option = [
    {
        value:"A",
        label:"A group"
    }
]
  const columns = [
    {
      title: "شماره تماس",
      dataIndex: "name",
      key: "name"
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
     
        // onChange={value => setCo(value)}
         
      /> 
          </div>
        );
      }
    },
    {
      title: "",
      dataIndex: "sender",
      key: "sender",
      render: () => {
        return (
          <div className="flex gap-[20px]">
            <FontAwesomeIcon icon={faTrash} />
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        );
      }
    }
  ];


  return (
    <div>
       <Title title=' مدیریت کاربران'/>
      <PrimayTable
        dataSource={dataSource}
        columns={columns}
       
      />
      
    </div>
  );
};


export default UsersManagement