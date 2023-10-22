import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Button from "./Button";
const UploadImage = forwardRef(
  (
    {
      defaultImage,
      file,
      setfile,
      uploadImg,
      label,
      text,
      orange,
      className,
      id,
      multiple = false,
      ...rest
    },
    ref
  ) => {
    const [imagePreviewUrl, setstateimagePreviewUrl] = useState("");
    useEffect(() => {
      if (file) {
        if(typeof file !== "string"){
          let reader = new FileReader();
        reader.onloadend = () => {
          setstateimagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        }
      }
    }, []);

    const handleImageChange = e => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      if (!multiple) {
        setfile(file);
      } else {
        setfile(e.target.files)
      }

      reader.onloadend = () => {
        setstateimagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    };
    const onSelectFile = e => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => setfile(reader.result));
        reader.readAsDataURL(e.target.files[0]);
      }
    };
    const onImageLoaded = image => {
      let imageRef = image;
    };

console.log(file)
    return (
      <div
        className={`profile__uploader  relative ${className} ${orange
          ? "profile__uploader--orange"
          : ""}`}
        style={{ backgroundImage: `url(${typeof file === "string" ? file : imagePreviewUrl})` }}
      >
        <div className="profile__uploader--cover">
          {/* <label htmlFor="image__cover--perview">
          {coverfile ? (
            <img
              alt="imagePreview"
              className="imagePreview"
              src={imagePreviewUrl}
            />
          ) : (
           <div/>
          )}
        </label> */}
        </div>
        <div className="UploadProfile--uploadcoverbox">
          <input
            type="file"
            className="UploadProfile__input "
            id={id ? id : "image__cover--perview"}
            onInput={handleImageChange}
            onFocus={e => (e.target.placeholder = "")}
            ref={ref}
            multiple={multiple}
            // defaultValue={convertToFile()}
            {...rest}
          />
          <label
            className="UploadProfile__label"
            htmlFor={id ? id : "image__cover--perview"}
          >
            <img src={uploadImg} />
            <div className='button button__borderbot' >
              {text}
            </div>
          </label>
        </div>
      </div>
    );
  }
);

UploadImage.propTypes = {
  defaultImage: PropTypes.string,
  register: PropTypes.any
};

export default UploadImage;
