import { Modal, Pagination } from "antd";
import moment from "jalali-moment";
import React, { useState } from "react";
import OrderItems from "../components/layouts/order/OrderItems";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import ReactToPrint from "react-to-print";
import {
  ComponentToPrint,
  FunctionalComponentToPrint
} from "../components/share/Componentstoprint";
import PrintIcon from "../assets/img/iconsidebar/icons8-druckerklappe-offen-16.png";
import Loading from "../components/share/Loading";
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
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = React.useCallback(
    () => {
      console.log("`onBeforeGetContent` called");
      setLoading(true);
      setText("Loading new text...");

      return new Promise(resolve => {
        onBeforeGetContentResolve.current = resolve;

        setTimeout(() => {
          setLoading(false);
          setText("New, Updated Text!");
          resolve();
        }, 2000);
      });
    },
    [setLoading, setText]
  );

  React.useEffect(
    () => {
      if (
        text === "New, Updated Text!" &&
        typeof onBeforeGetContentResolve.current === "function"
      ) {
        onBeforeGetContentResolve.current();
      }
    },
    [onBeforeGetContentResolve.current, text]
  );

  const reactToPrintContent = React.useCallback(
    () => {
      return componentRef.current;
    },
    [componentRef.current]
  );
  const [DetailModal, setDetailModal] = useState(false);
  const [OrderItemsList, setOrderItemsList] = useState([]);
  const [PageSize, setPageSize] = useState();
  const [current, setcurrent] = useState(1);
  const onChange = page => {
    setcurrent(page);
  };
  const ShowDetailModal = list => {
    setDetailModal(true);
    setOrderItemsList(list);
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
      render: row => {
        const date = moment.from(row, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
        return (
          <div>
            {date}
          </div>
        );
      }
    },

    {
      title: "وضعیت سفارش",
      dataIndex: "state",
      key: "state",
      render(row) {
        return (
           <div>
           {
             row === 1 ? <span className="text-[#b8a237]">ثبت شده</span> 
             :row ===2?<span className="text-[#d5753c]">تکمیل اطلاعات</span>:
             row === 3 ? <span  className="text-[#31519c]">منتظر پراخت</span> 
             :row ===4?<span  className="text-[#31519c]">منتظر تایید کد رهگیری</span>:
             row === 5 ? <span  className="text-[#31591e]">آماده ارسال</span>
              :row ===6?<span  className="text-[#b93535]">رد شده</span>:
             row === 7 ? <span  className="text-[#b93535]">کنسل توسط کاربر</span> :null
           }
           </div>
        );
      }
    },
    {
      title: "تخفیف ",
      dataIndex: "discountPrice",
      key: "discountPrice"
    },
    {
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
      render: (row, key) => {
        return (
          <div className=" ">
            <CopyToClipboard
              text={`${row.city},${row.fullAddress}`}
              onCopy={() => toast.success("کپی شد")}
            >
              <div className=" cursor-copy">
                {row.city},{row.fullAddress}
              </div>
            </CopyToClipboard>
            <ReactToPrint
              content={reactToPrintContent}
              documentTitle={`Address ${key.userPhone}`}
              onAfterPrint={handleAfterPrint}
              onBeforeGetContent={handleOnBeforeGetContent}
              onBeforePrint={handleBeforePrint}
              removeAfterPrint
              trigger={reactToPrintTrigger}
            />
            {loading && <Loading />}
            {
              <div className="hidden">
                <FunctionalComponentToPrint
                  ref={componentRef}
                  text={row} 
                />
              </div>
            }
          </div>
        );
      }
    },
    {
      title: "جزییات سفارش ",
      dataIndex: "orderItems",
      key: "orderItems",
      render: row => {
        return (
          <Button varient="gray" onClick={() => ShowDetailModal(row)}>
            جزییات
          </Button>
        );
      }
    }
  ];
  const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <button>
        <img width={20} src={PrintIcon} />
      </button>
    ); // eslint-disable-line max-len
  }, []);
  const [OrderList, setOrderList] = useState([]);
  const apigetOrder = useFetch({
    method: "get",
    url: "api/Order/AllOrders",
    noHeader: false,
    trigger: true,
    params: {
      pageNumber: current,
      size: 12
    },
    argFunc: res => {
      setOrderList(res);
      setPageSize(res[0].count);
    },

    errMessage: () => {}
  });
  return (
   <>
   {!apigetOrder.loading ? <Card>
      <Title title=" مدیریت سفارش ها" />

      <PrimayTable dataSource={OrderList} columns={columns} />
      <div className="flex justify-center items-center mt-[20px]">
        <Pagination
          hideOnSinglePage={true}
          current={current}
          onChange={onChange}
          total={PageSize}
        />
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
        <OrderItems list={OrderItemsList} />
      </Modal>
    </Card> : <Loading/>}</>
  );
};

export default OrderManagment;
