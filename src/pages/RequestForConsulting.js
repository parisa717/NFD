import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import CreateCategory from "../components/layouts/Categories/CreateCategory";
import CreateFeatures from "../components/layouts/Fetures/CreateFeatures";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import SearchInput from "../components/share/SearchInput";
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
    trigger: false,
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

  const [searchtext, setsearchtext] = useState("");
  useEffect(() => {
    if(searchtext.length > 0){
      apiSearchCatList.reFetch()
    }else{
      apigetCatList.reFetch()
    }
  }, [searchtext])
  const apiSearchCatList = useFetch({
    method: "get",
    url: `api/Counseling/Search/${searchtext}`,
    noHeader: false,
    trigger: false,
    setter:setConsulingList,
   
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });

  return (
    <Card>
       <Title title=' درخواست های مشاوره'/>

      <SearchInput setsearchtext={setsearchtext}  />

      <PrimayTable
        dataSource={ConsulingerList}
        columns={columns}
       
      />
     
    </Card>
  );
};


export default RequestForConsulting