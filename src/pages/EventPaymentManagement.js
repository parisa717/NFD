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
const EventPaymentManagement = () => {
  const columns = [
    {
      title: "مبلغ سفارش",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "تعداد سفارش",
      dataIndex: "count",
      key: "count"
    },
    {
      title: "شماره سفارش",
      dataIndex: "orderNumber",
      key: "orderNumber"
    },
    {
      title: "نوع پرداخت",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "وضعیت پرداخت",
      dataIndex: "state",
      key: "state"
    },

   
   
  ];
  const [PaymentList, setPaymentList] = useState([])
  const apigetCatList = useFetch({
    method: "get",
    url: "api/PaymentLog/All",
    noHeader: false,
    trigger: true,
    params:{
      pageNumber:1,
      size:10
    },
    setter: setPaymentList,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  return (
    <Card>
               <Title title=' مدیریت پرداخت ها'/>

      <PrimayTable
        dataSource={PaymentList}
        columns={columns}
       
      />
     
    </Card>
  );
};


export default EventPaymentManagement