import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import ReactCodeInput from "react-code-input";
import Button from '../share/Button';
import useFetch from '../../Hooks/useAxios';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Countdown, { CountdownApi } from "react-countdown";
import toast from 'react-hot-toast';

const RegisterbyCode = ({phone}) => {
    const { formState: { errors, isValid }, control, handleSubmit } = useForm();
    const [running, setRunning] = useState(true);

const props = {
    className: "reactCodeInput",
    inputStyle: {
      width: "56px",
      height: "56px",
      borderRadius: "5px",
      fontSize: "20px",
      marginRight: "14px",
      backgroundColor: "transparent",
      color: "#313E45",
      border: "2px solid #DADFE1",
      textAlign: "center",
      direction:"ltr"
    }
  };
  const { authDispatch, authRefreshDispatch } = useAuth(false);
const navigate = useNavigate()
  const [codevalue, setcodevalue] = useState();
  const apiPostNumber = useFetch({
    method: "post",
    url: "api/User/Login",
    noHeader: true,
    trigger: false,
    data: {...phone,code:codevalue},
    argFunc: (res) => {
   
       authDispatch({
         type: "LOGIN",
         token: res.token
       });
       navigate("/")
    },
    errMessage: (err) => {
      if(err.response.data.Message === "Not Correct"){
        toast.error("کد وارد شده صحیح نمیباشد")
      }
    

    }
  });
  const onSubmit=()=>{
    apiPostNumber.reFetch()
  }
  
  const apiPostNumberSendOtp = useFetch({
    method: "post",
    url: "api/User/Otp/Send",
    noHeader: true,
    trigger: false,
    data: {...phone},
    argFunc: () => {
      
    },
    errMessage: (err) => {
toast.error(err.response.data.Message)
    }
  });
  return (
    <div>
         <p className="text-[30px] text-[#1e3358] mb-[10px]"> تایید شماره تماس</p>

<p className="text-[18px] mb-[40px]">  به وبسایت ایزی ویزیت خوش آمدید کد ۶ رقمی ارسال‌شده به شماره تماس 
          را واردکنید.</p>
              
         <form onSubmit={handleSubmit(onSubmit)}>
         <ReactCodeInput
              value={codevalue}
              onChange={e => setcodevalue(e)}
              fields={6}
              {...props}
            />
      <div className="mt-[10px] text-[15px]">
          ارسال مجدد کد تایید تا
          <span className='text-[#d77a37] mx-[5px]'>
            {" "}{" "}
            {running
              ? <Countdown
                  zeroPadTime={2}
                  date={Date.now() + 120000}
                  autoStart={running}
                  onComplete={()=>setRunning(false)}
                  renderer={({ hours, minutes, seconds, completed }) => {
                    return (
                      <span>
                        0{minutes}:{seconds}
                      </span>
                    );
                  }}
                />
              : <span
                  className="cursor-pointer text-[#d77a37] mx-[5px]"
                  onClick={() => {
                    apiPostNumberSendOtp.reFetch();
                    setRunning(true);
                  }}
                >
                  ارسال مجدد
                </span>}
            {/* <Countdown
            date={Date.now() * 20000}
            precision={3}
            autoStart={running}
            renderer={({ hours, minutes, seconds, completed }) => {
              return (
                <span>
                  {hours}:{minutes}:{seconds}
                </span>
              );
            }}
          /> */}
          </span>
          دیگر امکان پذیر است
        </div>
          <Button disabled={apiPostNumber.loading} varient="primary" className="mt-[40px]" fullwidth>
            ثبت
          </Button>
        </form>
    </div>
  )
}

export default RegisterbyCode