import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PropertyvalueBox from "../components/layouts/product/PropertyvalueBox";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import Input from "../components/share/Input";
import Selectbox from "../components/share/Selectbox";
import Textarea from "../components/share/Textarea";
import Title from "../components/share/Title";
import UploadImage from "../components/share/UploadImg";
import useFetch from "../Hooks/useAxios";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import TextEditor from "../components/share/TextEditor";
const typeOption =[
  {
    label:"ایزی کارت پیشفرض",
    value:1
  },
  {
    label:"ایزی کارت معمولی",
    value:2
  },
  {
    label:" ایزی کارت اختصاصی",
    value:3
  },
  {
    label:" ایزی تگ",
    value:4
  },
  {
    label:"ایزی استند",
    value:5
  },
  {
    label:" ایزی بانک پیشفرض",
    value:6
  },
  {
    label:"ایزی بانک اختصاصی",
    value:7
  }
]
const AddProduct = () => {
  const { formState: { errors, isValid }, control, handleSubmit } = useForm();
  const [productdata, setproductdata] = useState()
  const [file, setfile] = useState();
  const [cat, setcat] = useState();
  const [prop, setprop] = useState();
  const [type, settype] = useState();
  const [description, setdescription] = useState();
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  const onSubmit = data => {
    console.log("data",data)
    const PropertyData = prop?.map(i=>({value:data[i.value],propertyId:i.propertyId}))

     const formdata = new FormData();
     formdata.append("Title", data.Title);
    // PropertyData.forEach((i,index)=>formdata.append(`Properties[${index}]`,i))
    // cat.forEach((i,index)=>formdata.append(`Categories[${index}]`,i))

     formdata.append("Description", description);
     formdata.append("ShortDescription", data.ShortDescription);
     formdata.append("UrlName", data.UrlName);
     formdata.append("Price", data.Price);
     formdata.append("Type", type);
     formdata.append("ImageCover", file,file.name);
     formdata.append("CovermageName", file.name);
    PropertyData.forEach(element => {
      formdata.append("Properties",JSON.stringify(element));
    })
    cat.forEach(element => {
      formdata.append("Categories",JSON.stringify(element));
    });
     setproductdata(formdata)
  };
  const [catdata, setcatdata] = useState();
console.log("cat",cat)
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
  const [Propertylist, setPropertylist] = useState();
  const apigetpropList = useFetch({
    method: "get",
    url: "api/Property/All",
    noHeader: false,
    trigger: true,
    
    argFunc: res => {
      setPropertylist(res.map(i => ({ value: i.id, label: i.tittle })));
    },
    errMessage: () => {}
  });
  
  const apipostproduct = useFetch({
    method: "post",
    url: "api/Product/Add",
    noHeader: false,
    trigger: false,
    data:productdata,
   formdata:true,
    argFunc: res => {
      navigate(`/add-img-to-product/${res}`)
      
    },
    errMessage: () => {}
  });

  const navigate = useNavigate();
  console.log(cat)
useEffect(() => {
  if(productdata){
    apipostproduct.reFetch()
  }
}, [productdata])
  return (
    <Card>
      <Title title="اضافه کردن محصول" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <UploadImage
          file={file}
          setfile={setfile}
          id={1}
          text="اپلود عکس کاور"
        />
        <Input
          name="Title"
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
          name="UrlName"
          control={control}
          errors={errors}
          label="نام لینک"
          className="seconadary-input "
          type="text"
          register={{
            required: "عنوان اجباری است "
          }}
        />
        <Input
          name="Price"
          control={control}
          errors={errors}
          label=" قیمت"
          className="seconadary-input  my-[20px] "
          type="number"
          register={{
            required: "عنوان اجباری است "
          }}
        />
        <Selectbox
          label="نوع"
          option={typeOption}
          className=" my-[20px]"
          onChange={(value) => settype(value)}
        />
      
        {catdata && <Selectbox
          label="دسته بندی"
          option={catdata}
            mode="multiple"
         
          className=" my-[20px]"
  onChange={setcat}
        />
      } 
      {Propertylist && <Selectbox
          label="ویژگی"
          option={Propertylist}
          
           mode="multiple"
          onChange={(value,label) => setprop(label.map(i=>({propertyId:i.value,value:i.children})))}
        />}
      <div className="grid-cols-3 grid gap-[32px]"> 
        {
          prop?.map(i=>
            <PropertyvalueBox  
               control={control}
               errors={errors}
               name={i.value}
               label={i.value}
            />
            )
        } 
      </div>
        <Textarea
          name="ShortDescription"
          control={control}
          errors={errors}
          label="توضیحات کوتاه"
          className="seconadary-input  my-[20px]"
          type="text"
          register={{
            required: "عنوان اجباری است "
          }}
        />
         {/* <Textarea
          name="Description"
          control={control}
          errors={errors}
          label="توضیحات"
          className="seconadary-input  my-[20px]"
          type="text"
          register={{
            required: "عنوان اجباری است "
          }}
        /> */}
         <p className="d-flex label text-[17px] mb-[10px]">
         توضیحات
      </p>
        <TextEditor text={description} settext={setdescription}  />

        <Button
         // onClick={() => navigate("/add-img-to-product")}
          varient="primary"
          className="mt-[40px]"
          fullwidth
          disabled={apipostproduct.loading}
        >
          ساخت محصول و رفتن به قدم بعدی
        </Button>
      </form>
    </Card>
  );
};

export default AddProduct;
