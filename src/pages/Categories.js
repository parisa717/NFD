import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { useState } from "react";
import CreateCategory from "../components/layouts/Categories/CreateCategory";
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
const Categories = () => {
  const columns = [
    {
      title: "عنوان",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "زیرمجموعه",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "نام لینک",
      dataIndex: "sender",
      key: "sender"
    },
    {
      title: "",
      dataIndex: "sender",
      key: "sender",
      render: () => {
        return (
          <div className="flex gap-[20px]">
            <FontAwesomeIcon icon={faTrash} />
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        );
      }
    }
  ];
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

  return (
    <div>
         <Title title='  دسته بندی ها'/>
      <div className="flex justify-end">
        {" "}<Button
        onClick={showModal}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن دسته بندی </div>
        </Button>
      </div>
      <PrimayTable
        dataSource={dataSource}
        columns={columns}
       
      />
      <Modal title="Basic Modal" footer={null} closable={true} onCancel={handleCancel}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }} open={isModalOpen}>
        <CreateCategory />
      </Modal>
    </div>
  );
};

export default Categories;
