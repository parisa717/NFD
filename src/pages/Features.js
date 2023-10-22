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
const Features = () => {
  const columns = [
    {
      title: "عنوان",
      dataIndex: "name",
      key: "name"
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
      <Title title='ویژگی ها'/>
      <div className="flex justify-end">
        {" "}<Button
        onClick={showModal}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن ویژگی
 </div>
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
        <CreateFeatures />
      </Modal>
    </div>
  );
};


export default Features