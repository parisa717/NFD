 import { Modal, Pagination } from "antd";
import moment from "jalali-moment";
import { useState } from "react";
import OrderItems from "../components/layouts/order/OrderItems";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from "react-hot-toast";

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
const OrderManagment = () => {
  const [DetailModal, setDetailModal] = useState(false);
  const [OrderItemsList, setOrderItemsList] = useState([]);
  const [PageSize, setPageSize] = useState();
  const [current, setcurrent] = useState(1);
  const onChange = page => {
    setcurrent(page);

  };
  const ShowDetailModal = list => {
    setDetailModal(true);
    setOrderItemsList(list)
  };
  const CancelDetailModal = id => {
    setDetailModal(false);
  };

  const columns = [
    {
      title: "کاربر",
      dataIndex: "userPhone",
      key: "userPhone"
    },
    {
      title: "کد سفارش",
      dataIndex: "orderNumber",
      key: "orderNumber"
    },

    {
      title: "تاریخ سفارش ",
      dataIndex: "cratedAt",
      key: "cratedAt",
      render:(row)=>{
        const date =moment.from(row, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
        return(
          <div>{date}</div>
        )
      }
    },

    {
      title: "وضعیت سفارش",
      dataIndex: "state",
      key: "state",
    
    },
    {
      title: "تخفیف ",
      dataIndex: "discountPrice",
      key: "discountPrice"
    }, {
      title: "هزینه ی ارسال ",
      dataIndex: "postingPrice",
      key: "postingPrice"
    },
    {
      title: "قیمت نهایی ",
      dataIndex: "finalPrice",
      key: "finalPrice"
    },
    {
      title: "آدرس ",
      dataIndex: "address",
      key: "address",
      render:(row)=>{
        return(
          <CopyToClipboard text={`${row.city},${row.fullAddress}`}
          onCopy={() => toast.success("کپی شد")}>
           <div className=" cursor-copy">{row.city},{row.fullAddress}</div>
        </CopyToClipboard>
        
        )
      }
    },
    {
      title: "جزییات سفارش ",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (row) => {
        return <Button varient="gray" onClick={()=>ShowDetailModal(row)}>جزییات</Button>;
      }
    }
  ];
  
  const [OrderList, setOrderList] = useState([])
  const apigetProductListByType = useFetch({
    method: "get",
    url: "api/Order/AllOrders",
    noHeader: false,
    trigger: true,
    params:{
      pageNumber:current,
      size:12
    },
    argFunc: res => {
      setOrderList(res)
      setPageSize(res[0].count)
     
      
    },
 
    errMessage: () => {}
  });
  return (
    <Card>
               <Title title=' مدیریت سفارش ها'/>

      <PrimayTable dataSource={OrderList} columns={columns} />
      <div className="flex justify-center items-center mt-[20px]">
              <Pagination hideOnSinglePage={true} current={current} onChange={onChange} total={PageSize} />
              </div>
        <Modal
          title=" جزییات سفارش"
          footer={null}
          closable={true}
          onCancel={CancelDetailModal}
          okButtonProps={{
            style: {
              display: "none"
            }
          }}
          cancelButtonProps={{
            style: {
              display: "none"
            }
          }}
          open={DetailModal}
        >
          <OrderItems  list={OrderItemsList} />
        </Modal>

    </Card>
  );
};

export default OrderManagment;
