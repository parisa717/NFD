import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import CreateFeatures from "../components/layouts/Fetures/CreateFeatures";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";

const Features = () => {
  const [Propertydata, setPropertydata] = useState([]);
  const [PropertyID, setPropertyID] = useState();
  const [EditModal, setEditModal] = useState(false);
  const ShowEditModal = id => {
    setPropertyID(id);
    setEditModal(true);
  };
  const CancelEditModal = id => {
    setEditModal(false);
  };
  const [deleteFet, setdeleteFet] = useState()
  const apiPropertyList = useFetch({
    method: "get",
    url: "api/Property/All",
    noHeader: false,
    trigger: true,
    setter: setPropertydata,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  useEffect(() => {
    if(deleteFet){
      apideleteFet.reFetch()
    }
    }, [deleteFet])
    const deletedFeature = (id)=>{
      setdeleteFet(id)
    }
    const apideleteFet = useFetch({
      method: "post",
      url: "api/Property/Delete",
      noHeader: false,
      trigger: false,
       params: {
        id: deleteFet
      },
     caller:apiPropertyList,
      argFunc: res => {
        console.log(res);
      },
      errMessage: () => {}
    });
  const columns = [
    {
      title: "عنوان",
      dataIndex: "tittle",
      key: "tittle"
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (row, record) => {
        return (
          <div className="flex gap-[20px]">
            <button onClick={()=>deletedFeature(row)}>
              {" "}<FontAwesomeIcon icon={faTrash} />
            </button>
            {/* <button onClick={() => ShowEditModal(row)}>
              {" "}<FontAwesomeIcon icon={faPenToSquare} />
            </button> */}
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
      <Title title="ویژگی ها" />
      <div className="flex justify-end">
        {" "}<Button
          onClick={showModal}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن ویژگی</div>
        </Button>
      </div>
      <PrimayTable
       dataSource={Propertydata} 
       columns={columns} />
      <Modal
        title="اضافه کردن ویژگی"
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
        <CreateFeatures  onCancel={handleCancel} apiPropertyList={apiPropertyList} />
      </Modal>
      <Modal
        title=" ویرایش ویژگی"
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
        <CreateFeatures onCancel={CancelEditModal} apiPropertyList={apiPropertyList} edit={true} propid={PropertyID} />
      </Modal>
    </Card>
  );
};

export default Features;
