import { Radio } from 'antd';
import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../share/Button';
import Input from '../../share/Input'
import Selectbox from '../../share/Selectbox';

const AddDiscount = () => {
    const { formState: { errors, isValid }, control, handleSubmit } = useForm();
const onSubmit=(data)=>{
console.log(data)
}
const Option = [
    {
        value:"A",
        label:"A group"
    }
]
  return (
    <div>
         <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="title"
            control={control}
            errors={errors}
            label="نام کدتخفیف"
            className="seconadary-input"
            type="text"
            register={{
              required: "نام اجباری است "
            }}
          />
        <div className='my-[20px]'>  <div className='mb-[20px] '>نوع تخفیف</div>
      <Radio.Group name="radiogroup" defaultValue={1}>
    <Radio value={1}>درصدی</Radio>
    <Radio value={2}>مبلغ</Radio>
 
  </Radio.Group></div>
  <Input
            name="value"
            control={control}
            errors={errors}
            label="مقدار"
            className="seconadary-input"
            type="text"
            register={{
              required: "نام اجباری است "
            }}
          />
          <Button varient="primary" className="mt-[40px]" fullwidth>
            ثبت
          </Button>
        </form>
    </div>
  )
}

export default AddDiscount