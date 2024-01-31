import {
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateCategory from "../components/layouts/Categories/CreateCategory";
import CreateFeatures from "../components/layouts/Fetures/CreateFeatures";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import SearchInput from "../components/share/SearchInput";
import Selectbox from "../components/share/Selectbox";
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

const UsersManagement = () => {
  const [users, setusers] = useState();
  const [PageSize, setPageSize] = useState();
  const [current, setcurrent] = useState(1);
  const onChange = page => {
    setcurrent(page);

  };
  const apigetuserList = useFetch({
    method: "get",
    url: "api/User/AllUsers",
    params: {
      pageNumber: current,
      size: 10
    },
    noHeader: false,
    trigger: true,
    setter: setusers,
    argFunc: res => {
     setPageSize(res[0].count);
    },
    errMessage: () => {}
  });
  useEffect(() => {
    apigetuserList.reFetch()
  }, [current])
  
  const [roles, setroles] = useState();
  const [userroles, setuserroles] = useState();
  const [userId, setuserId] = useState();
  const apigetRoleList = useFetch({
    method: "get",
    url: "api/Role/All",
    noHeader: false,
    trigger: true,
    setter: setroles,
    argFunc: res => {
      setroles(res.map(i => ({ value: i.id, label: i.title })));
    },
    errMessage: () => {}
  });
  const [rolesId, setrolesId] = useState();
  const apiChangeRoles = useFetch({
    method: "post",
    url: "api/User/UserRole",
    noHeader: false,
    trigger: false,
  
    params: {roleId:userroles ,userId:userId},
    argFunc: res => {toast.success("نقش کاربر با موفقیت تغییر کرد.")},
    errMessage: () => {toast.error("عملیات با مشکل مواجه شد.")}
  });
  console.log(roles);
  const columns = [
    {
      title: "شماره تماس",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "name",
      key: "name",
      render: (row, record) => {
        return (
          <div>
            {record.firstName} {record.lastname}
          </div>
        );
      }
    },

    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "نقش کاربر",
      dataIndex: "id",
      key: "id",
      render: (row, record) => {
        return (
          <div className="flex gap-[20px]">
            {roles &&
              <Selectbox
                // label="نقش کاربر"
                option={roles}
                value={record.rolesId}
                defaultValue={record.role ? record.role : ""}
                onChange={value => {setuserroles(value);setuserId(row)}}
              />}
          </div>
        );
      }
    }
  ];
  useEffect(() => {
   if(userroles){
    apiChangeRoles.reFetch()
   }
  }, [userroles])
  
  const [searchtext, setsearchtext] = useState("");

  const apiSearchproductList = useFetch({
    method: "get",
    url: `api/Product/Search/${searchtext}`,
    noHeader: false,
    trigger: false,
    setter: setusers,

    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });

  useEffect(
    () => {
      if (searchtext.length > 0) {
        apiSearchproductList.reFetch();
      } else {
        apigetuserList.reFetch();
      }
    },
    [searchtext]
  );

  return (
    <Card>
      <Title title=" مدیریت کاربران" />
      <div className="flex justify-end my-[40px]">
        <SearchInput setsearchtext={setsearchtext} />
      </div>

      <div className="userManagment">
        <PrimayTable dataSource={users} columns={columns} />
        <div className="flex justify-center items-center mt-[20px]">
              <Pagination hideOnSinglePage={true} current={current} onChange={onChange} total={PageSize} />
              </div>
      </div>

    </Card>
  );
};

export default UsersManagement;
