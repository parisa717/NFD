import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import CreateCategory from "../components/layouts/Categories/CreateCategory";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import SearchInput from "../components/share/SearchInput";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";


const Categories = () => {
  const [catdata, setcatdata] = useState([]);
  const [catID, setcatID] = useState();
  const [deleteCat, setdeleteCat] = useState();
  const [EditModal, setEditModal] = useState(false);
  const [catlistdata, setcatlistdata] = useState();
  const [PageSize, setPageSize] = useState();
  const [current, setcurrent] = useState(1);
  const ShowEditModal = (id)=>{
    setcatID(id);
    setEditModal(true)
  }
  const CancelEditModal = (id)=>{
    setEditModal(false)
  }
  const apigetCatList = useFetch({
    method: "get",
    url: "api/Category/AllPaging",
    noHeader: false,
    trigger: false,
    setter:setcatdata,
    params:{
      pageNumber: current,
      size: 12,
    },
    argFunc: res => {
      const mapdata=res.map(i => ({ value: i.id, label: i.title }))
      setcatlistdata([{value:null,label:"root"},...mapdata]);
      setPageSize(res[0].count);

    },
    errMessage: () => {}
  });
  const [searchtext, setsearchtext] = useState("");

  const apiSearchCatList = useFetch({
    method: "get",
    url: `api/Category/Search/${searchtext}`,
    noHeader: false,
    trigger: false,
    setter:setcatdata,
   
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  
  useEffect(() => {
    if(searchtext.length > 0){
      apiSearchCatList.reFetch()
    }else{
      apigetCatList.reFetch()
    }
  }, [searchtext,current])
  
  const deletedCategories = (id)=>{
    setdeleteCat(id)
  }
  useEffect(() => {
  if(deleteCat){
    apiDeleteCat.reFetch()
  }
  }, [deleteCat])
  
  const apiDeleteCat = useFetch({
    method: "post",
    url: "api/Category/Delete",
    noHeader: false,
    trigger: false,
     params: {
      id: deleteCat
    },
   caller:apigetCatList,
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
      dataIndex: "parentName",
      key: "parentName"
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
          <button onClick={()=>deletedCategories(row)} >  <FontAwesomeIcon icon={faTrash} /></button>
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
  const onChange = page => {
    setcurrent(page);

  };
  return (
    <Card>
      <Title title="  دسته بندی ها" />
      
      <div className="flex justify-between">
      <SearchInput setsearchtext={setsearchtext}  />
        {" "}<Button
          onClick={showModal}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن دسته بندی </div>
        </Button>
        
      </div>
      <PrimayTable  dataSource={catdata} columns={columns} />
      <div className="flex justify-center items-center mt-[20px]">
              <Pagination hideOnSinglePage={true} current={current} onChange={onChange} total={PageSize} />
              </div>
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
        <CreateCategory  catdata={catlistdata}   onCancel={handleCancel}  apigetCatList={apigetCatList}  />
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
        <CreateCategory catdata={catlistdata}  onCancel={CancelEditModal} apigetCatList={apigetCatList} edit={true} catid={catID} />
      </Modal>
    </Card>
  );
};

export default Categories;
