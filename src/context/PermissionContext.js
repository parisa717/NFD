import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const PermissionContext = createContext();

const PermissionContextProvider = props => {
  const [Permissioninfo, setPermissionInfo] = useState({});
  const { token } = useAuth();

  useEffect(
    () => {

        setPermissionInfo(jwt_decode(token))
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
