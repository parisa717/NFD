import { Select } from "antd";
import React from "react";

//import {ReactComponent as SelectIcon } from "../../../../assets/img/icons/Arrow-down-select.svg"
const Selectbox = ({ label, className, option, ...rest }) => {
  const { Option } = Select;
  return (
    <div className={`Select relative ${className}`}>
      <h6 className="label text-[17px] mb-[10px]">
        {label}
      </h6>

 
      <Select
        id="countries"
        {...rest}
      // className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 text-[20px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {option.map(i =>
          <Option key={i.value} value={i.value}>
            {i.label}
          </Option>
        )}
      </Select>
    </div>
  );
};

export default Selectbox;
