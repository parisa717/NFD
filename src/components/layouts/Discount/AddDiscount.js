import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../../Hooks/useAxios";
import Button from "../../share/Button";
import Input from "../../share/Input";
import Selectbox from "../../share/Selectbox";

const AddDiscount = ({apigetDiscountList,onCancel}) => {

  const {
    formState: { errors, isValid },
    reset,
    control,
    handleSubmit
  } = useForm({ defaultValues: { code: "", value: "" } });
  const [ValuePostData, setValuePostData] = useState();
  const [value, setvalue] = useState(0);

  

  const apipostCat = useFetch({
    method: "post",
    url: "api/Discount/AddDiscount",
    noHeader: false,
    trigger: false,
    data: ValuePostData,
    caller:apigetDiscountList,
    argFunc: res => {
      onCancel()
      reset()
    },
    errMessage: () => {
      reset()

    }
  });
 
  const onSubmit = data => {
   
      setValuePostData({ ...data, type: value });
    
  };
  useEffect(
    () => {
      if (ValuePostData) {
       
          apipostCat.reFetch();
        
      }
    },
    [ValuePostData]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="code"
          control={control}
          errors={errors}
          label="نام کدتخفیف"
          className="seconadary-input"
          type="text"
          register={{
            required: "کد اجباری است "
          }}
        />
        <div className="my-[20px]">
          {" "}<div className="mb-[20px] ">نوع تخفیف</div>
          <Radio.Group name="radiogroup" defaultValue={1} value={value} onChange={(e)=>setvalue(e.target.value)}>
            <Radio value={2}>درصدی</Radio>
            <Radio value={1}>مبلغ</Radio>
          </Radio.Group>
        </div>
        <Input
          name="value"
          control={control}
          errors={errors}
          label="مقدار"
          className="seconadary-input"
          type="number"
          register={{
            required: "نام اجباری است "
          }}
        />
        <Button varient="primary" className="mt-[40px]" fullwidth>
          ثبت
        </Button>
      </form>
    </div>
  );
};

export default AddDiscount;
