import React, { useState } from 'react'
import Button from '../components/share/Button'
import Card from '../components/share/Card'
import MultipleImageFile from '../components/share/MultipleImageFile'
import Title from '../components/share/Title'

const AddImgToProduct = () => {
    const [file, setfile] = useState()
  return (
    <Card>
    <Title title="اضافه کردن  مدیا به محصول" />

        <MultipleImageFile file={file} setfile={setfile}/>
        <Button  varient="primary" className="mt-[40px]" fullwidth>
           ثبت
          </Button>
    </Card>
  )
}

export default AddImgToProduct