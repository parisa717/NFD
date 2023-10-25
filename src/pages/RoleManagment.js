import { Collapse, Modal, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Button from "../components/share/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddRoles from "../components/layouts/roles/AddRoles";
import Title from "../components/share/Title";
import Card from "../components/share/Card";
import useFetch from "../Hooks/useAxios";
import PrimayTable from "../components/share/Table";


const RoleManagment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title"
    },
   
   
   
  ];
const [roles, setroles] = useState()
  const apigetCatList = useFetch({
    method: "get",
    url: "api/Permission/All",
    noHeader: false,
    trigger: true,
    setter: setroles,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
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
             <Title title='  نقش ها'/>

      <div className="flex justify-end">
        {" "}<Button
          onClick={showModal}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن نقش</div>
        </Button>
      </div>
      <PrimayTable
       dataSource={roles} 
       columns={columns} />
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
       <AddRoles/>
      </Modal>
    </Card>
  );
};

export default RoleManagment;
