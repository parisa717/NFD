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
import { Link, NavLink } from "react-router-dom";
import { usePermissionInfo } from "../../context/PermissionContext";

const Sidebar = () => {
  const {Permissioninfo} = usePermissionInfo()
  const arr = [
    {
      title: "داشبورد ادمین",
      icon: counter,
      url: "/",
      
    },
    {
      title: "تعریف دسته بندی",
      icon: categories,
      url: "/categories",
      role:6
    },
    {
      title: "تعریف ویژگی",
      icon: feature,
      url: "/features",
      role:8

    },
    {
      title: "تعریف محصول",
      icon: product,
      url: "/product",
      role:7

    },
    {
      title: "مدیریت سفارشات",
      icon: order,
      url: "/orders",
      role:9

    },
    {
      title: "مدیریت کاربران",
      icon: user,
      url: "/users",
      role:22

    },
    {
      title: "مدیریت مقام ها",
      icon: user,
      url: "/roles",
      role:10

    },
    {
      title: "مدیریت رویداد های پرداخت",
      icon: payment,
      url: "/payments",
      role:11

    },
    {
      title: "مدیریت سفارشات کارت به کارت",
      icon: cardtocard,
      url: "/payments-card",
      role:9

    },
    {
      title: "کد تخفیف",
      icon: cardtocard,
      url: "/discounts",
      role:12

    },
    {
      title: "درخواست های مشاوره",
      icon: consulting,
      url: "/consulting",
      role:14

    },
   
  ];
  //console.log(Permissioninfo.http://schemas.microsoft.com/ws/2008/06/identity/claims/role )
  return (
    <div className="vertical-menu">

      <div className="h-[100]" >
        <div className="flex flex-col items-center text-[18px] mt-[40px]">
          <p className="text-[#3646ab]">سوپر ادمین</p>
          <p className="text-[#79797c] mt-[20px]">۰۹۱۳۷۹۳۰۳۵۷ +</p>
        </div>
        <ul className="px-[30px] mt-[40px]">
          {arr.map(i=><li className="my-[10px] py-[10px] px-[5px] text-[16px]" key={i.title}><NavLink  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active-router" : ""
  } to={i.url}>
            <div className="flex gap-[10px] items-center text-[#121935]">
            <img src={i.icon} alt={i.title} />

              <div>{i.title}</div>
            </div>
          </NavLink></li>)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
