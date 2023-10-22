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
const RequestForConsulting = () => {
  const columns = [
    {
      title: "شماره تماس",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "name",
      key: "name"
    },
   
  
  ];


  return (
    <div>
       <Title title=' درخواست های مشاوره'/>
      
      <PrimayTable
        dataSource={dataSource}
        columns={columns}
       
      />
     
    </div>
  );
};


export default RequestForConsulting