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
const CardToCardOrderManagment = () => {
  const columns = [
    {
      title: "مبلغ سفارش",
      dataIndex: "name",
      key: "name"
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
    {
      title: " ",
      dataIndex: "name",
      key: "name",
      render() {
        return (
         <div className="flex items-center gap-[20px]">
            <Button className="w-[70px]" varient="secondary" >
           تایید 
          </Button>
          <Button className="w-[70px]" varient="thirdbtn" >
           رد
          </Button>
         </div>
        );
      }
    }
   
   
  ];

  return (
    <div>
           <Title title=' تایید سفارشات کارت به کارت'/>
      <PrimayTable
        dataSource={dataSource}
        columns={columns}
       
      />
     
    </div>
  );
};


 
 export default CardToCardOrderManagment