import { Popconfirm } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from "../../../assets/img/temp/card-top.jpeg"
import { API_URL } from '../../../constants'
import useFetch from '../../../Hooks/useAxios'
import Button from '../../share/Button'

const ProductCard = ({info,apigetproductList}) => {
  const navigate = useNavigate()
  
  const apiSearchRoleList = useFetch({
    method: "post",
    url: `api/Product/Delete`,
    noHeader: false,
    trigger: false,
    params:{id:info.id},
   caller:apigetproductList,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  return (
    <div 
    
    // onClick={()=>navigate(`/product/${info.id}`)}
     className="ProductCard">
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
    <img className="w-full" src={`http://api.easivisit.com${info.covermageName}`} alt="Sunset in the mountains" />
    <div className="px-6 py-4">
      <div className="font-bold text-[20px] mb-2">{info.title}</div>
      <p className="text-gray-700 text-base">
{info.shortDescription}      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    </div>
    <div className='grid grid-cols-2 gap-[10px] p-[10px]'>
    <Popconfirm
    title="پاک کردن محصول"
    description="آیا از پاک کردن محصول مطمئن هستید؟"
    onConfirm={()=>apiSearchRoleList.reFetch()}
   // onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
  <Button varient="primary" >
پاک کردن محصول
  </Button>
  </Popconfirm>
  <Button varient="secondary" onClick={()=>navigate(`/Editproduct/${info.id}`)}>
    ویرایش محصول
    </Button>
</div>
  </div>
 
</div>
  )
}

export default ProductCard