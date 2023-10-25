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
import Card from "../components/share/Card";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";


const Categories = () => {
  const [catdata, setcatdata] = useState([]);
  const [catID, setcatID] = useState();
  const [EditModal, setEditModal] = useState(false);
  const ShowEditModal = (id)=>{
    setcatID(id);
    setEditModal(true)
  }
  const CancelEditModal = (id)=>{
    
    setEditModal(false)
  }
  const apigetCatList = useFetch({
    method: "get",
    url: "api/Category/All",
    noHeader: false,
    trigger: true,
    setter: setcatdata,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const columns = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "زیرمجموعه",
      dataIndex: "parentId",
      key: "parentId"
    },
    {
      title: "نام لینک",
      dataIndex: "urlName",
      key: "urlName"
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (row,record) => {
        return (
          <div className="flex gap-[20px]">
          <button >   <FontAwesomeIcon icon={faTrash} /></button>
           <button onClick={()=>ShowEditModal(row)}  > <FontAwesomeIcon icon={faPenToSquare} /></button>
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
    <Card>
      <Title title="  دسته بندی ها" />
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
      <PrimayTable dataSource={catdata} columns={columns} />
      <Modal
        title="اضافه کردن دسته بندی"
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
        <CreateCategory  />
      </Modal>
      <Modal
        title="ویرایش  دسته بندی"
        footer={null}
        closable={true}
        onCancel={CancelEditModal}
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
        open={EditModal}
      >
        <CreateCategory edit={true} catid={catID} />
      </Modal>
    </Card>
  );
};

export default Categories;
