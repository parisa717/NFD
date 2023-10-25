import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import ReactCodeInput from "react-code-input";
import Button from '../share/Button';
import useFetch from '../../Hooks/useAxios';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const RegisterbyCode = ({phone}) => {
    const { formState: { errors, isValid }, control, handleSubmit } = useForm();

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
    errMessage: () => {}
  });
  const onSubmit=()=>{
    apiPostNumber.reFetch()
  }
  
 
  return (
    <div>
                 <h2 className="text-[32px] mb-[40px]"> کد را وارد کنید</h2>

         <form onSubmit={handleSubmit(onSubmit)}>
         <ReactCodeInput
              value={codevalue}
              onChange={e => setcodevalue(e)}
              fields={6}
              {...props}
            />
     
          <Button disabled={apiPostNumber.loading} varient="primary" className="mt-[40px]" fullwidth>
            ثبت
          </Button>
        </form>
    </div>
  )
}

export default RegisterbyCode