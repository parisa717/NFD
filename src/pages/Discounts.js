import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddDiscount from "../components/layouts/Discount/AddDiscount";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import SearchInput from "../components/share/SearchInput";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";
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
const Discounts = () => {
  const [discount, setdiscount] = useState();
  const [discountId, setdiscountId] = useState();
  const columns = [
    {
      title: "نام کد تخفیف",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "نوع کد تخفیف",
      dataIndex: "type",
      key: "type",
      render:(row,record)=>{
        return(
          <div>{row === 0 ? "مقداری":"درصدی"}</div>
        )
      }
    },
    {
      title: "مقدار تخفیف",
      dataIndex: "value",
      key: "value"
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (row, record) => {
        return (
          <div className="flex gap-[20px]">
            <button onClick={() => setdiscountId(row)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        );
      }
    }
  ];

  const apigetDiscountList = useFetch({
    method: "get",
    url: "api/Discount/AllDiscounts",
    params: {
      pageNumber: 1,
      size: 10
    },
    noHeader: false,
    trigger: true,
    setter: setdiscount,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const apideleteDiscountList = useFetch({
    method: "post",
    url: "api/Discount/DeleteDiscount",
    params: {
      id: discountId
    },
    noHeader: false,
    trigger: false,
    caller:apigetDiscountList,
    argFunc: res => {
     toast.success("کد تخفیف با موفقیت پاک شد")
    },
    errMessage: () => {
      setdiscountId()
    }
  });
  useEffect(
    () => {
      if (discountId) {
        apideleteDiscountList.reFetch();
      }
    },
    [discountId]
  );

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
  const [searchtext, setsearchtext] = useState("");

  const apiSearchDiscountList = useFetch({
    method: "get",
    url: `api/Discount/Search/${searchtext}`,
    noHeader: false,
    trigger: false,
    setter:setdiscount,
   
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  
  useEffect(() => {
    if(searchtext.length > 0){
      apiSearchDiscountList.reFetch()
    }else{
      apigetDiscountList.reFetch()
    }
  }, [searchtext])
  return (
    <Card>
      <Title title=" کد تخفیف" />
      <div className="flex justify-between">
      <SearchInput setsearchtext={setsearchtext}  />
        {" "}<Button
          onClick={showModal}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن کد تخفیف</div>
        </Button>
      </div>
     

      <PrimayTable dataSource={discount} columns={columns} />
      <Modal
        title="اضافه کردن کد تخفیف"
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
        <AddDiscount
          onCancel={handleCancel}
          apigetDiscountList={apigetDiscountList}
        />
      </Modal>
    </Card>
  );
};

export default Discounts;
