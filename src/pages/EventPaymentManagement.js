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
const EventPaymentManagement = () => {
  const columns = [
    {
      title: "مبلغ سفارش",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "شماره سفارش",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "تاریخ سفارش",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "نوع پرداخت",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "وضعیت پرداخت",
      dataIndex: "name",
      key: "name"
    },

   
   
  ];

  return (
    <Card>
               <Title title=' مدیریت پرداخت ها'/>

      <PrimayTable
        dataSource={dataSource}
        columns={columns}
       
      />
     
    </Card>
  );
};


export default EventPaymentManagement