import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateCategory from "../components/layouts/Categories/CreateCategory";
import CreateFeatures from "../components/layouts/Fetures/CreateFeatures";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";

const CardToCardOrderManagment = () => {
  const columns = [
    {
      title: "مبلغ سفارش",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "شماره سفارش",
      dataIndex: "orderNumber",
      key: "orderNumber"
    },
    {
      title: "کد رهگیری",
      dataIndex: "paymentLogs",
      key: "paymentLogs",
      render:(row)=>{
        return(
          <div>{row[0].trackingCode}</div>
        )
      }
    },
    {
      title: "تعداد",
      dataIndex: "count",
      key: "count"
    },
    // {
    //   title: "وضعیت پرداخت",
    //   dataIndex: "name",
    //   key: "name"
    // },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render(row) {
        return (
         <div className="flex items-center gap-[20px]" >
            <Button disabled={apiVerifyOrder.loading} className="w-[70px]" varient="secondary" onClick={()=>setOrderId(row)} >
           تایید 
          </Button>
         
         </div>
        );
      }
    }
   
   
  ];
  const [OrderData, setOrderData] = useState([]);
  const [OrderId, setOrderId] = useState();
  const [PageSize, setPageSize] = useState();
  const [current, setcurrent] = useState(1);
  const onChange = page => {
    setcurrent(page);

  };
  const apigetOrderData = useFetch({
    method: "get",
    url: "api/Order/AllWaitForAccept",
    params:{
      pageNumber:current,
      size:10
    },
    noHeader: false,
    trigger: true,
    setter: setOrderData,
 argFunc:res=>{
   setPageSize(res[0].count)
 },
    errMessage: () => {}
  });

  const apiVerifyOrder = useFetch({
    method: "get",
    url: `api/Order/AcceptWireMoney/${OrderId}`,
   
    noHeader: false,
    trigger: false,
    caller:apigetOrderData,
  argFunc:()=>{

toast.success("سفارش تایید شد");
setOrderId()
  },
    errMessage: () => {
toast.error("عملیات با شکست مواجه شد");

    }
  });
  useEffect(() => {
  if(OrderId){
    apiVerifyOrder.reFetch()
  }
  }, [OrderId])
  
  
  return (
    <Card>
           <Title title=' تایید سفارشات کارت به کارت'/>
      <PrimayTable
        dataSource={OrderData}
        columns={columns}
       
      />
     <div className="flex justify-center items-center mt-[20px]">
              <Pagination hideOnSinglePage={true} current={current} onChange={onChange} total={PageSize} />
              </div>
    </Card>
  );
};


 
 export default CardToCardOrderManagment