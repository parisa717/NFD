import Title from "../components/share/Title";
import wallet from "../assets/img/iconsidebar/wallet-minus.svg";
import users from "../assets/img/iconsidebar/user-tag.svg";
import tag from "../assets/img/iconsidebar/tag.svg";
import CounterCard from "../components/layouts/Counter/CounterCard";
import Card from "../components/share/Card";
import { useState } from "react";
import useFetch from "../Hooks/useAxios";
const Dashboard = () => {
  const [TotalUser, setTotalUser] = useState([]);

  const apigetTotalUser = useFetch({
    method: "get",
    url: "api/User/CountOf",
    noHeader: false,
    trigger: true,
    argFunc: res => {
      setTotalUser(res.count);
    },
    errMessage: () => {}
  });
  const [TodayUser, setTodayUser] = useState([]);

  const apigetTodayUser = useFetch({
    method: "get",
    url: "api/User/CountOfRegisterToDay",
    noHeader: false,
    trigger: true,
    argFunc: res => {
      setTodayUser(res.count);
    },
    errMessage: () => {}
  });
  const [TotalOrder, setTotalOrder] = useState([]);

  const apigetTotalOrder = useFetch({
    method: "get",
    url: "api/Order/CountOf",
    noHeader: false,
    trigger: true,
    argFunc: res => {
      setTotalOrder(res);
    },
    errMessage: () => {}
  });
  const [TodayOrder, setTodayOrder] = useState([]);

  const apigetTodayOrder = useFetch({
    method: "get",
    url: "api/Order/CountOfToDy",
    noHeader: false,
    trigger: true,
    argFunc: res => {
      setTodayOrder(res);
    },
    errMessage: () => {}
  });
  const [TotalPrice, setTotalPrice] = useState([]);

  const apigetTotalPrice = useFetch({
    method: "get",
    url: "api/Order/AllPrice",
    noHeader: false,
    trigger: true,
    argFunc: res => {
      setTotalPrice(res);
    },
    errMessage: () => {}
  });
  const [TodayPrice, setTodayPrice] = useState([]);

  const apigetTodayPrice = useFetch({
    method: "get",
    url: "api/Order/AllPriceTody",
    noHeader: false,
    trigger: true,
    argFunc: res => {
      setTodayPrice(res);
    },
    errMessage: () => {}
  });
  return (
    <Card>
      <Title title="پیشخوان" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
        <CounterCard value={TodayOrder} icon={tag} title="تعداد فروش در روز" />
        <CounterCard  value={TodayUser} icon={users} title="تعداد کاربران در روز" />
        <CounterCard  value={TodayPrice} icon={wallet} title="مبلغ فروش  در روز" />
        <CounterCard value={TotalOrder} icon={tag} title="تعداد فروش در کل" />
        <CounterCard  value={TotalUser} icon={users} title="تعداد کاربران در کل" />
        <CounterCard value={TotalPrice}icon={wallet} title="مبلغ فروش  در کل" />

      </div>
    </Card>
  );
};

export default Dashboard;
