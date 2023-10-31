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
const RequestForConsulting = () => {
  const [ConsulingerList, setConsulingList] = useState([])
  const apigetCatList = useFetch({
    method: "get",
    url: "api/Counseling/All",
    noHeader: false,
    trigger: true,
    params:{
      pageNumber:1,
      size:10
    },
    setter: setConsulingList,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const columns = [
    {
      title: "شماره تماس",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "name",
      key: "name"
    },
   
  
  ];


  return (
    <Card>
       <Title title=' درخواست های مشاوره'/>
      
      <PrimayTable
        dataSource={ConsulingerList}
        columns={columns}
       
      />
     
    </Card>
  );
};


export default RequestForConsulting