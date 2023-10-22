import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import ReactCodeInput from "react-code-input";
import Button from '../share/Button';

const RegisterbyCode = () => {
    const { formState: { errors, isValid }, control, handleSubmit } = useForm();
const onSubmit=(data)=>{
console.log(data)
}
const props = {
    className: "reactCodeInput",
    inputStyle: {
      width: "71px",
      height: "71px",
      borderRadius: "5px",
      fontSize: "20px",
      marginRight: "14px",
      backgroundColor: "transparent",
      color: "#313E45",
      border: "2px solid #DADFE1",
      textAlign: "center"
    }
  };
  const [codevalue, setcodevalue] = useState("");

  return (
    <div>
                 <h2 className="text-[32px] mb-[40px]"> کد را وارد کنید</h2>

         <form onSubmit={handleSubmit(onSubmit)}>
         <ReactCodeInput
              value={codevalue}
              onChange={e => setcodevalue(e)}
              fields={5}
              {...props}
            />
     
          <Button varient="primary" className="mt-[40px]" fullwidth>
            ثبت
          </Button>
        </form>
    </div>
  )
}

export default RegisterbyCode