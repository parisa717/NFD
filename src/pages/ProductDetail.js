import React, { useState } from 'react'
import useFetch from '../Hooks/useAxios';
import he from 'he'
import { useParams } from 'react-router-dom';
import Button from '../components/share/Button';

const ProductDetail = () => {
    const [ProductInfo, setProductInfo] = useState()
    const [ProductImages, setProductImages] = useState()
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
        console.log(res);
      },
      errMessage: () => {}
    });
    const apiProductImage = useFetch({
        method: "get",
        url: "api/ProductImage/GetById",
        noHeader: false,
        trigger: true,
        params:{
            id:id
        },
        setter: setProductImages,
        argFunc: res => {
          console.log(res);
        },
        errMessage: () => {}
      });
  return (
    <div>
        {
            ProductInfo && <div><div><img src={ProductInfo.covermageName}/></div>
             <h4>
            {ProductInfo.title}
        </h4>
        <p>{ProductInfo.shortDescription}</p>
        <p> { he.decode(ProductInfo.description) }</p>
        
        </div>
        }

    </div>
  )
}

export default ProductDetail