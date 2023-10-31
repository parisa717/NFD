import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import useFetch from '../../../Hooks/useAxios';
import Button from '../../share/Button';
import Input from '../../share/Input'
import Selectbox from '../../share/Selectbox';

const CreateFeatures = ({edit,propid,onCancel,apiPropertyList}) => {
  
const {
  formState: { errors, isValid },
  reset,
  control,
  handleSubmit
} = useForm({defaultValues:{ tittle: "" }});
const [catdata, setcatdata] = useState();
const [CategoriesPostData, setCategoriesPostData] = useState();

const apigetCatList = useFetch({
  method: "get",
  url: "api/Property/All",
  noHeader: false,
  trigger: true,
  
  argFunc: res => {
    setcatdata(res.map(i => ({ value: i.id, label: i.tittle })));
  },
  errMessage: () => {}
}); 
const apigetCat = useFetch({
  method: "get",
  url: "api/Property/GetById",
  noHeader: false,
  trigger: edit,
  params: { id: propid },
  
  argFunc: res => {
    console.log(res);
    reset({ tittle: res.tittle});
   
  },
  errMessage: () => {}
});
useEffect(() => {
  if(propid){
    apigetCat.reFetch()
   
  }
}, [propid])

const apipostCat = useFetch({
  method: "post",
  url: "api/Property/Add",
  noHeader: false,
  trigger: false,
  data: CategoriesPostData,
  caller:apiPropertyList,
  argFunc: res => {
    onCancel()
  },
  errMessage: () => {}
});
const updateCat = useFetch({
  method: "post",
  url: "api/Property/Update",
  noHeader: false,
  trigger: false,
  data: CategoriesPostData,
  caller:apiPropertyList,
  argFunc: res => {
    onCancel()
  },
  errMessage: () => {}
});
const onSubmit = data => {
  if (edit) {
    setCategoriesPostData({ ...data ,id:propid });
  } else {
    setCategoriesPostData({ ...data });
  }
};
useEffect(
  () => {
   
    if (CategoriesPostData) {
      if(edit){ 
        updateCat.reFetch()
      }else{
        apipostCat.reFetch();
      
      }
     
    }
  },
  [CategoriesPostData]
);

  return (
    <div>
         <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="tittle"
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