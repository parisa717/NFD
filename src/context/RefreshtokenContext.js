import React, { createContext, useReducer, useState } from "react";
import Cookies from "js-cookie";
import useFetch from "../Hooks/useAxios";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

const RefreshtokenContext = createContext();

const RefreshtokenProvider = props => {
  const { authDispatch, RefreshtokenDispatch } = useAuth(false);
  const navigate = useNavigate();
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
      console.log(res.token);
    },
    errMessage: (err) => {
      // if(err.response.data.message){
      //   authDispatch({ type: "LOGOUT" });
      // navigate("/register", { replace: true });
      // }
      
    }
  });
  setInterval(() => {
    apiProductInfoCategries.reFetch();
  }, 710000);
  return (
    <RefreshtokenContext.Provider value={{}} {...props}>
      {props.children}
    </RefreshtokenContext.Provider>
  );
};

const useRefreshtoken = () => React.useContext(RefreshtokenContext);

export { RefreshtokenProvider, useRefreshtoken };
