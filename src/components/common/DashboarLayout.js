import { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import ResponsiveSidbar from "./ResponsiveSidbar";
import Sidebar from "./Sidebar";

const DashboarLayout = () => {
  const [show, setshow] = useState(false);

  return (
    <div className="">
      <div id="layout-wrapper">
        <Menu />
        <div
          className={`hambergur-menu ${show ? "change" : ""} `}
          onClick={() => setshow(!show)}
        >
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>
        <div className="container" onClick={() => setshow(false)}>
          <div className="DashboarLayout--container mt-[200px]">
            <Sidebar />
            <ResponsiveSidbar show={show}/>

            <div />
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
