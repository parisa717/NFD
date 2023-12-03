import { Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
import { set } from "immutable";
import toast from "react-hot-toast";
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
const EditProduct = () => {
    const [ProductInfo, setProductInfo] = useState();
    const [ProductInfoCategories, setProductInfoCategories] = useState()
    const [ProductInfoFeatures, setProductInfoFeatures] = useState()

  const { formState: { errors, isValid }, reset,control, handleSubmit } = useForm({
    defaultValues: useMemo(
        () => {
          return ProductInfo;
        },
        [ProductInfo]
      )
  });
  

  const {id}= useParams()
  const apiProductInfo = useFetch({
    method: "get",
    url: "api/Product/GetById",
    noHeader: false,
    trigger: true,
    params:{
        id:id
    },
    setter: setProductInfo,
    argFunc: res => {
      console.log(res)
       
    },
    errMessage: () => {}
  });
  const apiProductInfoCategries = useFetch({
    method: "get",
    url: `api/CategoryToProduct/AllByProductId/${parseInt(id)}`,
    noHeader: false,
    trigger: true,
   
    argFunc: res => {
     setcat(res)
      console.log("cat",res) ;
      //setProductInfoCategories(res)
    },
    errMessage: () => {}
  });
  console.log(typeof(parseInt(id) ))
  const apiProductInfoFeatures = useFetch({
    method: "get",
    url: `api/ProductProperties/AllByProductId/${parseInt(id)}`,
    noHeader: false,
    trigger: true,
    // params:{
    //     id:id
    // },
    setter: setProductInfoFeatures,
    argFunc: res => {
     setprop(res)
      console.log("Prop",res) 
    },
    errMessage: () => {}
  });
  
  const [productdata, setproductdata] = useState()
  const [file, setfile] = useState();
  const [cat, setcat] = useState();
  const [prop, setprop] = useState();
  const [type, settype] = useState();
  const [description, setdescription] = useState();
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  useEffect(() => {
    if(ProductInfo){
     reset({
       Title:ProductInfo.title,
       UrlName:ProductInfo.urlName,
       ShortDescription:ProductInfo.shortDescription,
       Price:ProductInfo.price
   })
   settype(ProductInfo.type);
   setdescription(ProductInfo.description)
   setfile(`http://api.easivisit.com${ProductInfo.covermageName}`)
    }
   
   }, [ProductInfo])
console.log("prop",prop);
console.log("cat",cat);
  const onSubmit = data => {
    console.log("data",data)
    const PropertyData = prop?.map(i=>({value:data[i.value],propertyId:i.propertyId}))

     const formdata = new FormData();
     formdata.append("Title", data.Title);
     formdata.append("id",id);
    // PropertyData.forEach((i,index)=>formdata.append(`Properties[${index}]`,i))
    // cat.forEach((i,index)=>formdata.append(`Categories[${index}]`,i))

    formdata.append("Description", description);
    formdata.append("ShortDescription", data.ShortDescription);
    formdata.append("UrlName", data.UrlName);
    formdata.append("Price", data.Price);
    formdata.append("Type", type);
    if(typeof(file) !== "string"){
      formdata.append("ImageCover", file,file.name);
      formdata.append("CovermageName", file.name);
    }
   
    prop.forEach(element => {
      formdata.append("Properties",JSON.stringify({propertyId:element.propertyId,value:element.value}));
    })
   cat.forEach(element => {
    formdata.append("Categories",JSON.stringify(element.categoryId));
   });
     setproductdata(formdata)
  };
  const [catdata, setcatdata] = useState();
console.log(prop)
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
    url: "api/Product/Update",
    noHeader: false,
    trigger: false,
    data:productdata,
   formdata:true,
    argFunc: res => {
      toast.success("محصول با موفقیت بروزرسانی شد.")
      navigate(`/add-img-to-product/${id}`)
      
    },
    errMessage: () => {}
  });

  const navigate = useNavigate();
  
useEffect(() => {
  if(productdata){
    apipostproduct.reFetch()
  }
}, [productdata])
console.log(cat)
  return (
    <Card>
      <Title title="ویرایش کردن محصول" />

      <form onSubmit={handleSubmit(onSubmit)}>
       {ProductInfo?.covermageName && <UploadImage
          file={file}
          setfile={setfile}
          id={1}
          text="اپلود عکس کاور"
          defaultImage={file}
        /> }
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
            required: "نام لینک اجباری است "
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
            required: "قیمت اجباری است "
          }}
        />
        <Selectbox
          label="نوع"
          option={typeOption}
          className=" my-[20px]"
          onChange={(value) => settype(value)}
          value={type}
        />
      
        {catdata && <Selectbox
          label="دسته بندی"
          option={catdata}
            mode="multiple"
         
          className=" my-[20px]"
          value={cat?.map(i=>i.categoryId)}
          onChange={(value,label) => setcat(label.map(i=>({categoryId:i.value})))}

          />
      } 
      {Propertylist && <Selectbox
          label="ویژگی"
          option={Propertylist}
          value={prop?.map(i=>i.propertyId)}
           mode="multiple"
          onChange={(value,label) => {
            setprop(label.map(i=>({propertyId:i.value,value:i.children})))
            setProductInfoFeatures(label.map(i=>({propertyId:i.value,name:i.children})))
          }}
        />}
      <div className="grid-cols-3 grid gap-[32px]"> 
        {
            ProductInfoFeatures?.map(i=><PropertyvalueBox edit  control={control}
            errors={errors}
            name={i.name}
            label={i.name} 
            value={i.value ? i.value : ""} />)
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
       {description && <TextEditor text={description} settext={setdescription}  />}

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

export default EditProduct;
