import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../share/Button';
import Input from '../../share/Input'
import Selectbox from '../../share/Selectbox';

const CreateFeatures = () => {
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
            label="نام"
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

export default CreateFeatures