import { Collapse, Modal, Pagination, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Button from "../components/share/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddRoles from "../components/layouts/roles/AddRoles";
import Title from "../components/share/Title";
import Card from "../components/share/Card";
import useFetch from "../Hooks/useAxios";
import PrimayTable from "../components/share/Table";
import SearchInput from "../components/share/SearchInput";
import toast from "react-hot-toast";


const RoleManagment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [RoleId, setRoleId] = useState(false);
  const [PageSize, setPageSize] = useState();
  const [current, setcurrent] = useState(1);
  const onChange = page => {
    setcurrent(page);

  };
  const columns = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "دسترسی ها",
      dataIndex: "permissionsName",
      key: "permissionsName",
      render: (row, record) => {
        return(
          <div className="flex gap-[10px]">
          {
            row.map(i=><div>{i}</div>)
          }
          </div>
        )
        }
    },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    render: (row, record) => {
      return (
        <div className="flex gap-[20px]">
          <button onClick={() => setRoleId(row)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      );
    }
  }
   
   
   
  ];
const [roles, setroles] = useState()
  const apigetRoleList = useFetch({
    method: "get",
    url: "api/Role/AllPaging",
    noHeader: false,
    trigger: true,
    setter: setroles,
    params:{
      pageNumber:current,
      size:10
    },
    argFunc: res => {
      setPageSize(res[0].count);
    },
    errMessage: () => {}
  });
  useEffect(() => {
    apigetRoleList.reFetch()
  }, [current])
  const apideleteRoleList = useFetch({
    method: "post",
    url: "api/Role/Delete",
    noHeader: false,
    trigger: false,
    params:{id:RoleId},
    caller:apigetRoleList,
    argFunc: res => {
     toast.success("با موفقیت حذف شد")
    },
    errMessage: () => {
      toast.error("عملیات با مشکل مواجه شد لطفا دوباره امتحان کنید")
    }
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
  useEffect(() => {
    if(RoleId){
       apideleteRoleList.reFetch()
    }
  }, [RoleId])
  const [searchtext, setsearchtext] = useState("");

  const apiSearchRoleList = useFetch({
    method: "get",
    url: `api/Role/Search/${searchtext}`,
    noHeader: false,
    trigger: false,
    setter:setroles,
   
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  
  useEffect(() => {
    if(searchtext.length > 0){
      apiSearchRoleList.reFetch()
    }else{
      apigetRoleList.reFetch()
    }
  }, [searchtext])
  return (
    <Card>
             <Title title='  نقش ها'/>

      <div className="flex justify-between">
      <SearchInput setsearchtext={setsearchtext}  />
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
            <div className="flex justify-center items-center mt-[20px]">
              <Pagination hideOnSinglePage={true} current={current} onChange={onChange} total={PageSize} />
              </div>
        <Modal title=" اضافه کردن نقش" footer={null} closable={true} onCancel={handleCancel}
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
       <AddRoles caller={apigetRoleList} onCancel={handleCancel}/>
      </Modal>
    </Card>
  );
};

export default RoleManagment;
