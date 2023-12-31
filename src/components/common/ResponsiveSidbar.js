import counter from "../../assets/img/iconsidebar/speedometer.svg";
import categories from "../../assets/img/iconsidebar/category-2.svg";
import feature from "../../assets/img/iconsidebar/setting-2.svg";
import product from "../../assets/img/iconsidebar/card-add.svg";
import order from "../../assets/img/iconsidebar/shopping-bag.svg";
import user from "../../assets/img/iconsidebar/user.svg";
import payment from "../../assets/img/iconsidebar/empty-wallet.svg";
import cardtocard from "../../assets/img/iconsidebar/empty-wallet-change.svg";
import consulting from "../../assets/img/iconsidebar/user-search.svg";
import admin from "../../assets/img/iconsidebar/user-tick.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../Hooks/useAxios";
import { useAuth } from "../../context/authContext";

const ResponsiveSidbar = ({ show }) => {
  const arr = [
    {
      title: "داشبورد ادمین",
      icon: counter,
      url: "/"
    },
    {
      title: "تعریف دسته بندی",
      icon: categories,
      url: "/categories"
    },
    {
      title: "تعریف ویژگی",
      icon: feature,
      url: "/features"
    },
    {
      title: "تعریف محصول",
      icon: product,
      url: "/product"
    },
    {
      title: "مدیریت سفارشات",
      icon: order,
      url: "/orders"
    },
    {
      title: "مدیریت کاربران",
      icon: user,
      url: "/users"
    },
    {
      title: "مدیریت نقش ها",
      icon: user,
      url: "/roles"
    },
    {
      title: "مدیریت رویداد های پرداخت",
      icon: payment,
      url: "/payments"
    },
    {
      title: "مدیریت سفارشات کارت به کارت",
      icon: cardtocard,
      url: "/payments-card"
    },
    {
      title: "کد تخفیف",
      icon: cardtocard,
      url: "/discounts"
    },
    {
      title: "درخواست های مشاوره",
      icon: consulting,
      url: "/consulting"
    }

  ];
  const [userdata, setuserdata] = useState([]);

  const apigetuserList = useFetch({
    method: "get",
    url: "api/User/GetUser",
  
    noHeader: false,
    trigger: true,
    setter: setuserdata,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const LogoutFunc = ()=>{
    authDispatch({ type: 'LOGOUT' });
    navigate('/register', { replace: true });
  
  }
  return (
    <div className={` ResponsiveSidbar ${show ? "ResponsiveSidbar__show ":""}`}>
      <div className="h-[100]">
        <div className="flex flex-col items-center text-[18px] mt-[40px]">
        <p className="text-[#3646ab]">{userdata?.roleName}</p>
          <p className="text-[#79797c] mt-[20px]">{userdata?.phone} +</p>
        </div>
        <ul className="px-[30px] mt-[40px]">
          {arr.map(i =>
            <li
              className="my-[10px] py-[10px] px-[5px] text-[16px]"
              key={i.title}
              
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active-router" : ""}
                to={i.url}
              >
                <div className="flex gap-[10px] items-center text-[#121935]">
                  <img src={i.icon} alt={i.title} />

                  <div>
                    {i.title}
                  </div>
                </div>
              </NavLink>
            </li>
          )}
           <li onClick={LogoutFunc} className=" cursor-pointer my-[10px] py-[10px] px-[5px] text-[16px]">
  خروج
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveSidbar;
