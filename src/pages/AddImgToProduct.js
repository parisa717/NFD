import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/share/Button";
import Card from "../components/share/Card";
import MultipleImageFile from "../components/share/MultipleImageFile";
import Title from "../components/share/Title";
import useFetch from "../Hooks/useAxios";

const AddImgToProduct = () => {
  const { id } = useParams();
  const [files, setfiles] = useState();
  const [ImageList, setImageList] = useState();
  const [ImageId, setImageId] = useState();
  const [postData, setpostData] = useState();
  const apigetproductImage = useFetch({
    method: "get",
    url: "api/ProductImage/AllByProductId",
    noHeader: false,
    trigger: true,
    params: { id: id },
    argFunc: res => {
      setImageList(res);
      console.log(res);
    },
    errMessage: () => {}
  });
  const apipostproduct = useFetch({
    method: "post",
    url: "api/ProductImage/Add",
    noHeader: false,
    trigger: false,
    data: postData,
    formdata: true,
    caller: apigetproductImage,

    argFunc: res => {
      toast.success("عکس با موفقیت اپلود شد");
    },
    errMessage: () => {}
  });
  const apideleteproduct = useFetch({
    method: "post",
    url: "api/ProductImage/Delete",
    noHeader: false,
    trigger: false,
    data: postData,
    params: { id: ImageId },
    caller: apigetproductImage,
    argFunc: res => {
      toast.success("عکس با موفقیت پاک شد");
    },
    errMessage: () => {}
  });
  const hanldeFormdata = file => {
    const formdata = new FormData();

    formdata.append("ProductId", id);
    formdata.append(`Image`, file[file.length - 1].file);
    formdata.append(`ImageUrl`, file[file.length - 1].data_url);

    setpostData(formdata);
  };

  useEffect(
    () => {
      if (postData) {
        apipostproduct.reFetch();
      }
    },
    [postData]
  );

  useEffect(
    () => {
      if (ImageId) {
        apideleteproduct.reFetch();
      }
    },
    [ImageId]
  );
  const navigate = useNavigate()
  return (
    <Card>
      <Title title="اضافه کردن  مدیا به محصول" />

      <MultipleImageFile
        setImageId={setImageId}
        apideleteproduct={apideleteproduct}
        ImageList={ImageList}
        apigetproductImage={apigetproductImage}
        hanldeFormdata={hanldeFormdata}
        file={files}
        setfile={setfiles}
      />
      <Button onClick={()=>navigate("/product")} varient="primary" className="mt-[40px]" fullwidth>
        ثبت
      </Button>
    </Card>
  );
};

export default AddImgToProduct;
