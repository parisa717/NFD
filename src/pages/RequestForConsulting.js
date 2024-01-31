import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import CreateCategory from "../components/layouts/Categories/CreateCategory";
import CreateFeatures from "../components/layouts/Fetures/CreateFeatures";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import SearchInput from "../components/share/SearchInput";
import PrimayTable from "../components/share/Table";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";

const RequestForConsulting = () => {
  const [ConsulingerList, setConsulingList] = useState([]);
  const [PageSize, setPageSize] = useState();
  const [current, setcurrent] = useState(1);
  const onChange = page => {
    setcurrent(page);
  };
  const apigetCatList = useFetch({
    method: "get",
    url: "api/Counseling/All",
    noHeader: false,
    trigger: false,
    params: {
      pageNumber: current,
      size: 10
    },
    setter: setConsulingList,
    argFunc: res => {
      setPageSize(res[0].count);
    },
    errMessage: () => {}
  });
  const columns = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "شماره تماس",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "name",
      key: "name"
    }
  ];

  const [searchtext, setsearchtext] = useState("");
  useEffect(
    () => {
      if (searchtext.length > 0) {
        apiSearchCatList.reFetch();
      } else {
        apigetCatList.reFetch();
      }
    },
    [searchtext,current]
  );
  const apiSearchCatList = useFetch({
    method: "get",
    url: `api/Counseling/Search/${searchtext}`,
    noHeader: false,
    trigger: false,
    setter: setConsulingList,

    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });


  return (
    <Card>
       <Title title=" درخواست های مشاوره" />
       <div className="flex justify-between items-end">
        <SearchInput setsearchtext={setsearchtext} />
       </div>
       <div className="mt-[40px]">
        <PrimayTable dataSource={ConsulingerList} columns={columns} />
       </div>
       <div className="flex justify-center items-center mt-[20px]">
        <Pagination
          hideOnSinglePage={true}
          current={current}
          onChange={onChange}
          total={PageSize}
        />
       </div>
    </Card>
  );
};

export default RequestForConsulting;
