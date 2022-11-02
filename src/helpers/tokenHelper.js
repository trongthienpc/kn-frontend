import axios from "axios";
import {
  refreshTokeFailed,
  refreshTokeStart,
  refreshTokeSuccess,
} from "../store/reducers/authSlice";
import * as url from "../constants/url-helper";
import jwt_decode from "jwt-decode";
// refresh token
const refreshToken = async (dispatch) => {
  try {
    dispatch(refreshTokeStart());
    const newInstance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    const res = await newInstance.post(
      `${process.env.REACT_APP_BASE_URL}/${url.REFRESH}`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    dispatch(refreshTokeFailed(error?.response?.data?.message));
    console.log(error);
  }
};

export const createAxios = (user, dispatch) => {
  console.log(user);
  const newInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    // headers: { "Content-Type": "application/json" },
  });
  // Add a request interceptor
  newInstance.defaults.withCredentials = true;
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();

      const decodedToken = jwt_decode(user?.accessToken);
      // console.log("decodedToken", decodedToken);
      if (decodedToken?.exp < date.getTime() / 1000) {
        const data = await refreshToken(dispatch);
        console.log(data);
        const refreshUser = {
          ...user,
          accessToken: data?.accessToken,
        };
        dispatch(refreshTokeSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data?.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // Add a response interceptor
  newInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
  return newInstance;
};
