import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import ProductCard from "../components/layouts/product/ProductCard";

import Button from "../components/share/Button";
import Card from "../components/share/Card";
import SearchInput from "../components/share/SearchInput";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";

const Product = () => {
  const navigate = useNavigate();

  const goToAddProduct = () => {
    navigate("/add-product");
  };
  const arr = new Array(3);
  const [productdata, setproductdata] = useState([]);

  const apigetproductList = useFetch({
    method: "get",
    url: "api/Product/All",
    params:{
      pageNumber:1,
      size:10
    },
    noHeader: false,
    trigger: false,
    setter: setproductdata,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  const [searchtext, setsearchtext] = useState("");

  const apiSearchproductList = useFetch({
    method: "get",
    url: `api/Product/Search/${searchtext}`,
    noHeader: false,
    trigger: false,
    setter:setproductdata,
   
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });
  
  useEffect(() => {
    if(searchtext.length > 0){
      apiSearchproductList.reFetch()
    }else{
      apigetproductList.reFetch()
    }
  }, [searchtext])
  return (
    <Card>
      <Title title=" محصول" />

      <div className="flex justify-between">
      <SearchInput setsearchtext={setsearchtext}  />

        <Button
          onClick={goToAddProduct}
          varient="primary"
          className="flex gap-[8px] items-center mb-[40px]"
        > 
          <FontAwesomeIcon icon={faPlus} />
          <div> اضافه کردن محصول</div>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-[32px]">
       {
         productdata.map(i=><ProductCard info={i} />)
       }
      </div>
    </Card>
  );
};

export default Product;
