import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import Button from "./Button";
// import trashIcon from "../../assets/img/icons/trash-white.svg"
// import uploadIcon from "../../assets/img/icons/uploadlist.svg"
import { useParams } from "react-router-dom";

function MultipleImageFile({
  defaultImage,
  file,
  setfile,
  uploadImg,
  label, 
  text,
  orange,
  className,
  fileid,
  editfile,
  seteditfile,
  multiple = false,
  ...rest
}) {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setfile(imageList);
  };
  const deleteOldPic = (index,i)=>{
    const updatedWelfare = {
      ...editfile[index],
      path: i.path,
      delete:true
    };
    editfile.splice(index, 1);
    seteditfile([
      ...editfile.slice(0, index),
      updatedWelfare,
      ...editfile.slice(index + 1)
    ]);

  }
  const {id} =useParams()
  console.log("editfile",editfile)
  console.log("file",file)
  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          acceptType = ["jpg", "gif", "png"]
        }) =>
          // write your building UI
          <div className="">
            {(file === 0 && editfile.length === 0)
              ? <div
                  style={isDragging ? { color: "red" } : undefined}
                  {...dragProps}
                  className={
                    "upload__image-wrapper"
                  }
                  onClick={() => onImageUpload()}
                >
                  <img src={uploadImg} />

                  <Button varient="borderbot" className="">
                    {text}
                  </Button>
                </div>
              :  <div className="upload__image-wrapper--grid">
                 
                 { 
                      editfile?.filter(j=>j.delete !== true).map((i,index)=>
                        
                        <div key={index} className="image-item">
                        <div className="upload__image-wrapper--images relative">
                          <button className="center bg-silicon"  onClick={() => {
                               deleteOldPic(index,i);
                              }}>
                          <div>trash</div>
                          </button>
                          <img
                            src={i.path}
                            alt=""
                            width="87"
                            height="64"
                            className="upload__image-wrapper--img"
                          />

                        
                        </div>
                      </div>)
                    }
            
                    {file?.map((image, index) =>
                      <div key={index} className="image-item">
                        <div className="upload__image-wrapper--images relative">
                          <button className="center bg-silicon"  onClick={() => {
                                onImageRemove(index);
                              }}>
                          <div>trash</div>
                          </button>
                          <img
                            src={image.data_url}
                            alt=""
                            width="87"
                            height="64"
                            className="upload__image-wrapper--img"
                          />

                        
                        </div>
                      </div>
                    )}
                    
                  <div
                    style={isDragging ? { color: "red" } : undefined}
                    {...dragProps}
                    className={
                      "newUploadWrapper flex justify-center items-center"
                    }
                    onClick={() => onImageUpload()}
                  >
                    <div className="center-column">
                     

                     <div className="newUploadWrapper--text">
                     تصویر جدید <span className="text-[#0013a6]">اضافه</span> کنید
                     </div>
                       
                    </div>
                  </div>
                </div>}
          </div>}
      </ImageUploading>
    </div>
  );
}

export default MultipleImageFile;
