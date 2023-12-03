import React from "react";
import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="bg-[#4747475b] fixed w-[100vw] h-[100vh] top-0 left-0 flex justify-center items-center z-[9999999]">
      <Bars
        height="80"
        width="80"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
