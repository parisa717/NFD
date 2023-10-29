import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/share/Button'
import Card from '../components/share/Card'
import MultipleImageFile from '../components/share/MultipleImageFile'
import Title from '../components/share/Title'
import useFetch from '../Hooks/useAxios'

const AddImgToProduct = () => {
  const {id} = useParams()
    const [files, setfiles] = useState()
    const [postData, setpostData] = useState()
    const apipostproduct = useFetch({
      method: "post",
      url: "api/ProductImage/Add",
      noHeader: false,
      trigger: false,
      data:postData,
     formdata:true,
      argFunc: res => {

      },
      errMessage: () => {}
    });
    const hanldeFormdata=(file)=>{
       const formdata= new FormData()
      
       formdata.append("ProductId",id)
       formdata.append("Image",file.file)
       formdata.append("ImageUrl",file.data_url)
       setpostData(formdata)
      
       apipostproduct.reFetch() 
    }
    const onSubmit = ()=>{
      
       
        files.forEach(element => {
          hanldeFormdata(element);
         
        });
     
    }

    
 

  useEffect(() => {
   if(postData){
   // apipostproduct.reFetch()
   console.log(`postData`,postData)

   }
  }, [postData])
  
  return (
    <Card>
    <Title title="اضافه کردن  مدیا به محصول" />

          <MultipleImageFile file={files} setfile={setfiles}/>
            <Button onClick={onSubmit} varient="primary" className="mt-[40px]" fullwidth>
                ثبت
            </Button>
    </Card>
  )
}

export default AddImgToProduct