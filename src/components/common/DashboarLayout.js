import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

const DashboarLayout = () => {
  return (
    <div className="">
      <div id="layout-wrapper">
      <Menu />
     <div className="container">
     <div className="DashboarLayout--container mt-[200px]" >
         
         <Sidebar/>
         <div></div>
         <main className="DashboarLayout--main">
         <Outlet />
         </main>
      </div>
     </div>
      </div>
    </div>
  );
};

export default DashboarLayout;
