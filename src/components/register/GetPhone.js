import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useFetch from "../../Hooks/useAxios";
import Button from "../share/Button";
import Input from "../share/Input";

const GetPhone = ({ setphone, setstep }) => {
  const { formState: { errors, isValid }, control, handleSubmit } = useForm();
  const [datapost, setdatapost] = useState();
  const onSubmit = data => {
    setphone(data);

    setdatapost(data);
  };
  const apiPostNumber = useFetch({
    method: "post",
    url: "api/User/Otp/Send",
    noHeader: true,
    trigger: false,
    data: datapost,
    argFunc: () => {
      setstep(2);
    },
    errMessage: (err) => {
toast.error(err.response.data.Message)
    }
  });
  useEffect(
    () => {
      if (datapost) {
        apiPostNumber.reFetch();
      }
    },
    [datapost]
  );

  return (
    <div>
         <p className="text-[30px] text-[#1e3358] mb-[20px]"> به <span className="text-[#d77a37]">ایزی ویزیت</span> خوش آمدید.</p>

         <p className="text-[18px] mb-[40px]"> شماره همراه خود را برای ورود یا ثبت نام وارد کنید</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="mobile"
          control={control}
          errors={errors}
          label="شماره تلفن"
          className="seconadary-input"
          type="number"
          register={{
            required: {
              value: true,
              message: "شماره تماس خود را وارد کنید"
            },
           pattern: {
            value: /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
             message:
            " فرمت درست(۱۲۱۲ ۱۲۳ ۰۹۱۳) شماره تماس وارد شده اشتباه است!",
           }
          }}
          placeholder=" شماره تماس خود را وارد کنید"
        />

        <Button  disabled={apiPostNumber.loading} varient="primary" className="mt-[40px]" fullwidth>
          ثبت
        </Button>
      </form>
    </div>
  );
};

export default GetPhone;
