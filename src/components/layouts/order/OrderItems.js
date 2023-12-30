import React from 'react'
import PrimayTable from '../../share/Table'

const OrderItems = ({list}) => {
    const columns = [
      {
        title: "نام سفارش",
        dataIndex: "title",
        key: "title",
        render:(row,key)=>{
          return(
            <div className='flex gap-[8px] items-center'>
              <img width={50} src={`http://api.easivisit.com${key.image}`}/>
              <p>{row}</p>
            </div>
          )
        }
      },
        {
          title: "موجودی",
          dataIndex: "price",
          key: "price"
        },
        {
          title: "وضعیت",
          dataIndex: "state",
          key: "state"
        },
        {
          title: " مشخصات ",
          dataIndex: "orderItemInformation",
          key: "orderItemInformation",
          render:(row,key)=>{
            return(
              <div className=' flex gap-[7px]'>
                
          {row.fullName&&  <span> {row.fullName}   :نام کامل</span>}
         {row.jobTitle &&   <span> {row.jobTitle}   :نام شغل</span>}
              <span> {
                 row.backImage  && <a href={`http://api.easivisit.com${row.backImage}`}>
                   عکس پشت کارت
                 </a>
               }</span>
               <span> {
                 row.frontImage  && <a href={`http://api.easivisit.com${row.frontImage}`}>
                   عکس روی کارت
                 </a>
               }</span>
               <span> {
                 row.logo  && <a href={`http://api.easivisit.com${row.logo}`}>
                  عکس لوگو
                 </a>
               }</span>
               <span> {
                 row.backImage  && <a href={`http://api.easivisit.com${row.backImage}`}>
                   عکس پشت کارت
                 </a>
               }</span>

              </div>
            )
          }
        },
    
      ];
  return (
    <div>
              <PrimayTable  dataSource={list} columns={columns} />

    </div>
  )
}

export default OrderItems