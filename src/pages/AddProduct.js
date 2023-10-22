import { Upload } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import Button from '../components/share/Button';
import Input from '../components/share/Input';
import Selectbox from '../components/share/Selectbox';
import Textarea from '../components/share/Textarea';
import Title from '../components/share/Title';
import UploadImage from '../components/share/UploadImg';

const AddProduct = () => {
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
const [file, setfile] = useState()
const navigate = useNavigate()
  return (
    <div>
    <Title title="اضافه کردن محصول" />

         <form onSubmit={handleSubmit(onSubmit)}>
        <UploadImage file={file} setfile={setfile} id={1} 
        
        text="اپلود عکس کاور"
        />
          <Input
            name="title"
            control={control}
            errors={errors}
            label="عنوان"
            className="seconadary-input  my-[20px]"
            type="text"
            register={{
              required: "عنوان اجباری است "
            }}
          />
             <Input
            name="urllink"
            control={control}
            errors={errors}
            label="نام لینک"
            className="seconadary-input "
            type="text"
            register={{
              required: "عنوان اجباری است "
            }}
          />
         
           <Selectbox
        label="دسته بندی"
        option={Option}
      //  mode="multiple"
        // onChange={value => setCo(value)}
         className=' my-[20px]'
      />   <Selectbox
      label="ویژگی"
      option={Option}
    //  mode="multiple"
      // onChange={value => setCo(value)}
       
    /> 
       <Textarea
            name="description"
            control={control}
            errors={errors}
            label="نام لینک"
            className="seconadary-input  my-[20px]"
            type="text"
            register={{
              required: "عنوان اجباری است "
            }}
          />
         

          <Button onClick={()=>navigate("/add-img-to-product")} varient="primary" className="mt-[40px]" fullwidth>
            ساخت محصول و رفتن به قدم بعدی
          </Button>
        </form>
    </div>
  )
}

export default AddProduct