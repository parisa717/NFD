import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const useFetch = ({
  method = "get",
  url,
  data,
  headers = null,
  pagination = null,
  trigger = false,
  noHeader = false,
  argFunc = null,
  caller = null,
  params = null,
  errMessage = null,
  formdata=false,
  setter = null,
  gzip=false
}) => {
  const [refetchStatus, setRefetchStatus] = useState(trigger);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [innerTrigger, setInnerTrigger] = useState(0);
  const controllerRef = useRef(new AbortController());
  const { token ,authDispatch} = useAuth();
  const navigate = useNavigate();

  const apiCall = async () => {
    try {
      const result = await axios.request({
        params: params,
        method: method,
        url: !!pagination
          ? `${API_URL}/${url}/?page=${pagination.current}&pageSize=${pagination.pageSize}`
          : `${API_URL}/${url}`,
        data: data,
        headers: !noHeader
          ? { 'Access-Control-Allow-Origin' : '*',
              Authorization: `Bearer ${token}`,
            }: formdata
            ? { 'Content-Type': 'multipart/form-data',
            'accept':  '*/*' ,Authorization: `Bearer ${token}` }:
            gzip?{
              'Accept-Encoding': 'gzip',
              'Access-Control-Allow-Origin' : '*',
              "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` 
            }
          : {},

        signal: controllerRef.current.signal,
      });
      // console.log(result.data)
      if (setter !== null) setter(result.data);
      if (caller !== null) caller.reFetch();
      if (argFunc !== null) argFunc(result.data);
      setRefetchStatus(false);
      setResponse(result.data);
    } catch (error) {
      
      setError(error);
      errMessage(error);
      if(error?.response?.status === 401){
        authDispatch({ type: 'LOGOUT' })
        navigate('/register');
      }
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof trigger === "undefined" && !innerTrigger) return;
    // if (trigger) apiCall();
    if (refetchStatus) {
      setLoading(true);
      apiCall();
    }
  }, [innerTrigger]);

  const cancelRequest = () => {
    controllerRef.current.abort();
  };
  const reFetch = (type) => {
    console.log("re", params);
    // apiCall(nData, params);
    setInnerTrigger(+new Date());
    setRefetchStatus(true);
    // if (type !== "post") setPostReq(true);
  };

  return { response, error, loading, cancelRequest, reFetch };
};

export default useFetch;
