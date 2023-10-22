import React, { useState } from "react";
import GetPhone from "../components/register/GetPhone";
import RegisterbyCode from "../components/register/RegisterbyCode";
import logo from "../assets/img/logo/logo.png";
const Register = () => {
  const [step, setstep] = useState(1);
  const [phone, setphone] = useState();
  return (
    <div className="Register bg-[#122160]  flex flex-col justify-center items-center h-[100vh]  overflow-hidden">
        <div className="  w-full h-[70px] flex mb-[40px] justify-center items-center">
          <img width={300} src={logo} />
        </div>
      <div className="bg-[#fff] rounded-[5px]  px-[20px] flex  items-center justify-center  w-[475px] h-[500px]">
       
        <div className="">
          {step === 1
            ? <GetPhone setphone={setphone} setstep={setstep} />
            : <RegisterbyCode phone={phone} />}
        </div>
      </div>
    </div>
  );
};

export default Register;
