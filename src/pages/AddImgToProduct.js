import React, { useState } from 'react'
import Button from '../components/share/Button'
import MultipleImageFile from '../components/share/MultipleImageFile'
import Title from '../components/share/Title'

const AddImgToProduct = () => {
    const [file, setfile] = useState()
  return (
    <div>
    <Title title="اضافه کردن  مدیا به محصول" />

        <MultipleImageFile file={file} setfile={setfile}/>
        <Button  varient="primary" className="mt-[40px]" fullwidth>
           ثبت
          </Button>
    </div>
  )
}

export default AddImgToProduct