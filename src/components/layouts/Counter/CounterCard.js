import React from 'react'
import arrowDown from "../../../assets/img/iconsidebar/arrow-down-1.svg"
import arrowUp from "../../../assets/img/iconsidebar/arrow-up-2.svg"
const CounterCard = ({title,icon,persentage,value}) => {
  return (
    <div>
        <div className='CounterCard'>
            <div className='flex gap-[20px] items-center'>
                <div className='w-[40px] CounterCard-icon h-[40px] flex justify-center items-center '>

                    <img src={icon}/>

                </div>
                <h4 className='text-[18px] '>
                {title}
                </h4>
            </div>
            <div className='my-[20px] text-[20px] mr-8'>{value}</div>
            {/* <div className='flex justify-end gap-[8px] items-center text-[#0fa442] text-[15px]'>
                <p>27%</p>
                <img src={arrowUp}/>
                
            </div> */}
        </div>
    </div>
  )
}

export default CounterCard