import React from 'react'
import img from "../../../assets/img/temp/card-top.jpeg"
const ProductCard = ({info}) => {
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
    <img className="w-full" src={img} alt="Sunset in the mountains" />
    <div className="px-6 py-4">
      <div className="font-bold text-[20px] mb-2">عنوان کارت</div>
      <p className="text-gray-700 text-base">
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    </div>
  </div>
  )
}

export default ProductCard