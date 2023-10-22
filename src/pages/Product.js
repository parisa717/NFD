import {

  faPlus

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";
import ProductCard from "../components/layouts/product/ProductCard";

import Button from "../components/share/Button";
import Title from "../components/share/Title";

const Product = () => {
 
  const navigate = useNavigate()

  const goToAddProduct = ()=>{
    navigate("/add-product")
  }
  const arr = new Array(3)

  return (
    <div>
            <Title title=' محصول'/>

      <div className="flex justify-end">
        {" "}<Button
        onClick={goToAddProduct}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن محصول
 </div>
        </Button>
      </div>
    <div className="grid grid-cols-3 gap-[32px]">
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    </div>
     
    </div>
  );
};



export default Product