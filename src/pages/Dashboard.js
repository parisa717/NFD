import Title from "../components/share/Title";
import wallet from "../assets/img/iconsidebar/wallet-minus.svg";
import users from "../assets/img/iconsidebar/user-tag.svg";
import tag from "../assets/img/iconsidebar/tag.svg";
import CounterCard from "../components/layouts/Counter/CounterCard";
const Dashboard = () => {
  return (
    <div>
      <Title title="پیشخوان" />
      <div className="grid grid-cols-3 gap-[20px]">
        <CounterCard value={"۲۰۰"} icon={tag} title="تعداد فروش در روز" />
        <CounterCard  value={"۲۰۰"} icon={users} title="تعداد کاربران در روز" />
        <CounterCard  value={"۲۰۰"} icon={wallet} title="مبلغ فروش  در روز" />
        <CounterCard value={"۲۰۰"} icon={tag} title="تعداد فروش در کل" />
        <CounterCard  value={"۲۰۰"}icon={users} title="تعداد کاربران در کل" />
        <CounterCard value={"۲۰۰"}icon={wallet} title="مبلغ فروش  در کل" />

      </div>
    </div>
  );
};

export default Dashboard;
