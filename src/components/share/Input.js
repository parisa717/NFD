import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
const Input = ({
  name,
  value,
  message,
  control,
  register,
  label,
  absolute,
  className,
  errors,
  defaultValue,
  LabelIcon,
  inputIcon,
  psIcon,
  labelIn,
  ...rest
}) => {
  const error = errors[name];
  return (
    <div className={`Input relative ${className}`}>
      <p className="d-flex label text-[17px] mb-[10px]">
        {label && label}
      </p>

      <div className="relative">
        {LabelIcon &&
          <div className="LabelIcon">
            {LabelIcon}
          </div>}
        <Controller
          name={name}
          control={control}
          rules={register}
          defaultValue={defaultValue}
          render={({ field }) =>
            <input
              {...rest}
              {...field}
              className={`inputwithlabelicon bg-gray-50 border  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 text-[20px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error
                ? "border-[#ff3434]"
                : "border-gray-300"}`}
            />}
        />
        {labelIn &&
          <div className="labelIn">
            {labelIn}
          </div>}
        {psIcon &&
          <div className="ps__Icon">
            {" "}{psIcon}
          </div>}
      </div>
      {inputIcon &&
        <div className="input__icon">
          {inputIcon}
        </div>}
      {error &&
        <span className=" text-[#ff3434] mt-[6px] text-[10px]">
          {error.message}
        </span>}
    </div>
  );
};

Input.propTypes = {
  classes: PropTypes.any,
  control: PropTypes.any,
  errors: PropTypes.any,
  label: PropTypes.string,
  message: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.any,
  value: PropTypes.any
};
export default Input;
