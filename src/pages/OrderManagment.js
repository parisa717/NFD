import { Modal } from "antd";
import { useState } from "react";
import OrderItems from "../components/layouts/order/OrderItems";
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
const OrderManagment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "شماره ی سفارش",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "قیمت کل",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "تخفیف",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "قیمت پایانی",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "هزینه ی ارسال",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "وضعیت سفارش",
      dataIndex: "name",
      key: "name"
    },
    {
      title: " ",
      dataIndex: "name",
      key: "name",
      render() {
        return (
          <Button varient="secondary" onClick={showModal}>
            جزییات سفارش
          </Button>
        );
      }
    }
  ];
  
  return (
    <Card>
               <Title title=' مدیریت سفارش ها'/>

      <PrimayTable dataSource={dataSource} columns={columns} />

        <Modal
          title="Basic Modal"
          footer={null}
          closable={true}
          onCancel={handleCancel}
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
          open={isModalOpen}
        >
          <OrderItems />
        </Modal>

    </Card>
  );
};

export default OrderManagment;
