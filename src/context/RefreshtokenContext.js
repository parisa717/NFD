
import React, { createContext, useReducer, useState } from "react";
import Cookies from "js-cookie";
import useFetch from "../Hooks/useAxios";
import { useAuth } from "./authContext";

const RefreshtokenContext = createContext();

const RefreshtokenProvider = (props) => {
    const { RefreshtokenDispatch } = useAuth(false);

       const apiProductInfoCategries = useFetch({
           method: "post",
           url: "api/User/RefreshToken",
           noHeader: false,
           trigger: true,
           argFunc: res => {
               RefreshtokenDispatch({
                   type: "LOGIN",
                   token: res.token
                 });
           },
           errMessage: () => {}
         });
       setInterval(() => {
           apiProductInfoCategries.reFetch()
       }, 720000);
  return (
    <RefreshtokenContext.Provider
      value={{
     
      
      }}
      {...props}
    >
      {props.children}
    </RefreshtokenContext.Provider>
  );
};

const useRefreshtoken = () => React.useContext(RefreshtokenContext);

export { RefreshtokenProvider, useRefreshtoken };
