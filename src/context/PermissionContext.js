import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import useFetch from "../Hooks/useAxios";

const PermissionContext = createContext();

const PermissionContextProvider = props => {
  const [Permissioninfo, setPermissionInfo] = useState([]);
  const { token } = useAuth();
  const apiPropertyList = useFetch({
    method: "get",
    url: "api/User/UserPermissions",
    noHeader: false,
    trigger: true,
    setter: setPermissionInfo,
    argFunc: res => {
      console.log(res);
    },
    errMessage: () => {}
  });

  useEffect(
    () => {

    },
    [token]
  );

  return (
    <PermissionContext.Provider
      value={{
        Permissioninfo
      }}
      {...props}
    >
      {props.children}
    </PermissionContext.Provider>
  );
};
const usePermissionInfo = () => useContext(PermissionContext);

export { usePermissionInfo, PermissionContextProvider };

