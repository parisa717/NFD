import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    errMessage: () => {}
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
         <h2 className="text-[32px] mb-[40px]"> شماره تلفن خود را وارد کنید</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="phone"
          control={control}
          errors={errors}
          label="شماره تلفن"
          className="seconadary-input"
          type="number"
          register={{
            required: "شماره تلفن اجباری است "
          }}
        />

        <Button varient="primary" className="mt-[40px]" fullwidth>
          ثبت
        </Button>
      </form>
    </div>
  );
};

export default GetPhone;
