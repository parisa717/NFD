import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
const Textarea = ({
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
  ...rest
}) => {
  const error = errors[name];
  return (
    <div className={`Input relative ${className}`}>
     <p className="d-flex label text-[17px] mb-[10px]">
        {label && label}
      </p>

      <Controller
        name={name}
        control={control}
        rules={register}
        defaultValue={defaultValue}
        render={({ field }) => <textarea className="block  min-h-[200px] resize-none p-2.5 w-full  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...rest} {...field} />}
      />
      {inputIcon &&
        <div className="input__icon">
          {inputIcon}
        </div>}
      {error &&
        <span className="input__message text-red mt-[4px]">
          {error.message}
        </span>}
    </div>
  );
};

Textarea.propTypes = {
  classes: PropTypes.any,
  control: PropTypes.any,
  errors: PropTypes.any,
  label: PropTypes.string,
  message: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.any,
  value: PropTypes.any
};
export default Textarea;
