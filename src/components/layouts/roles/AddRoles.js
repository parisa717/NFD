import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../share/Button';
import Input from '../../share/Input'
import { Select } from 'antd';
import useFetch from '../../../Hooks/useAxios';
const options = [];
for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}
const AddRoles = () => {
    const { formState: { errors, isValid }, control, handleSubmit } = useForm();
    const [postdata, setpostdata] = useState()
    const onSubmit=(data)=>{
    setpostdata(data)
    }
    const Option = [
        {
            value:"A",
            label:"A group"
        }
    ]
    const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);
  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
  };
  const apipostPermission = useFetch({
    method: "post",
    url: "api/Permission/Add",
    noHeader: false,
    trigger: false,
    data: postdata,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  useEffect(() => {
   if(postdata){
    apipostPermission.reFetch()
   }
  }, [postdata])
  
 
  return (
    <div>
         <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="title"
            control={control}
            errors={errors}
            label="نام"
            className="seconadary-input mb-[20px]"
            type="text"
            register={{
              required: "نام اجباری است "
            }}
          />
         
         {/* <Select {...selectProps} /> */}
          <Button varient="primary" className="mt-[40px]" fullwidth>
            ثبت
          </Button>
        </form>
    </div>
  )
}

export default AddRoles