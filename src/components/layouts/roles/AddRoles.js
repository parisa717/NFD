import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../share/Button';
import Input from '../../share/Input'
import { Select } from 'antd';
import useFetch from '../../../Hooks/useAxios';
import Selectbox from '../../share/Selectbox';
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
    const [permissions, setpermissions] = useState()
    const onSubmit=(data)=>{
    setpostdata({...data,permissions:permissions})
    }
 
    const [roles, setroles] = useState()
    const apigetCatList = useFetch({
      method: "get",
      url: "api/Permission/All",
      noHeader: false,
      trigger: true,
     // setter: setroles,
      argFunc: res => {
       setroles(res.map(i => ({ value: i.id, label: i.title })))
      },
      errMessage: () => {}
    });

  const apipostPermission = useFetch({
    method: "post",
    url: "api/Role/AddRole",
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
         
    {roles &&  <Selectbox  onChange={value=>setpermissions(value)} option={roles}    mode="multiple"  />}
          <Button varient="primary" className="mt-[40px]" fullwidth>
            ثبت
          </Button>
        </form>
    </div>
  )
}

export default AddRoles