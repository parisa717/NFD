import { Collapse, Modal, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Button from "../components/share/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddRoles from "../components/layouts/roles/AddRoles";
import Title from "../components/share/Title";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const getItems = panelStyle => [
  {
    key: "1",
    label: "نقش اول",
    children: (
      <p>
        {text}
      </p>
    ),
    style: panelStyle
  },
  {
    key: "2",
    label: "نقش دوم",
    children: (
      <p>
        {text}
      </p>
    ),
    style: panelStyle
  },
  {
    key: "3",
    label: "نقش سوم",
    children: (
      <p>
        {text}
      </p>
    ),
    style: panelStyle
  }
];
const panelStyle = {
  marginBottom: 24,
  background: "#eaeaea",
  borderRadius: "#eaeaea",
  border: "none"
};
const RoleManagment = () => {
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
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) =>
          <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        items={getItems(panelStyle)}
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
       <AddRoles/>
      </Modal>
    </div>
  );
};

export default RoleManagment;
