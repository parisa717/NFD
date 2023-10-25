import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../../Hooks/useAxios";
import Button from "../../share/Button";
import Input from "../../share/Input";
import Selectbox from "../../share/Selectbox";

const CreateCategory = ({ catid, edit }) => {
  console.log(edit);
  const {
    formState: { errors, isValid },
    reset,
    control,
    handleSubmit
  } = useForm({defaultValues:{ title: "", urlName: "" }});
  const [catdata, setcatdata] = useState();
  const [CategoriesPostData, setCategoriesPostData] = useState();
  const [CatParents, setCatParents] = useState();

  const apigetCatList = useFetch({
    method: "get",
    url: "api/Category/All",
    noHeader: false,
    trigger: true,
    argFunc: res => {
      setcatdata(res.map(i => ({ value: i.id, label: i.title })));
    },
    errMessage: () => {}
  }); 
  const apigetCat = useFetch({
    method: "get",
    url: "api/Category/GetById",
    noHeader: false,
    trigger: edit,
    params: { id: catid },
    argFunc: res => {
      console.log(res);
      reset({ title: res.title, urlName: res.urlName });
      setCatParents(res.parentId)
    },
    errMessage: () => {}
  });
  useEffect(() => {
    if(catid){
      apigetCat.reFetch()
     
    }
  }, [catid])
  
  const apipostCat = useFetch({
    method: "post",
    url: "api/Category/Add",
    noHeader: false,
    trigger: false,
    data: CategoriesPostData,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const updateCat = useFetch({
    method: "put",
    url: "api/Category/Update",
    noHeader: false,
    trigger: false,
    data: CategoriesPostData,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const onSubmit = data => {
    if (edit) {
      setCategoriesPostData({ ...data, parentId: CatParents ,id:catid });
    } else {
      setCategoriesPostData({ ...data, parentId: CatParents });
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
        <Input
          name="urlName"
          control={control}
          errors={errors}
          label="نام لینک"
          className="seconadary-input my-[20px]"
          type="text"
          register={{
            required: "نام لینک اجباری است "
          }}
        />
        {catdata &&
          <Selectbox
            label="زیرمجموعه"
            option={catdata}
            defaultValue={null}
            onChange={value => setCatParents(value)}
            value={CatParents}
          />}
        <Button
          disabled={apipostCat.loading}
          varient="primary"
          className="mt-[40px]"
          fullwidth
        >
          ثبت
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
