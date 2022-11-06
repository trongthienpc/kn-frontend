import axios from "axios";
import * as url from "../constants/url-helper";
import {
  loginFailed,
  loginStarted,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
} from "../store/reducers/authSlice";

export const loginHelper = async (user, dispatch, navigate, from) => {
  dispatch(loginStarted());
  // console.log(from);
  try {
    const instance = axios.create({
      withCredentials: true,
      baseURL: `${process.env.REACT_APP_BASE_URL}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // const res = await axios.post(
    //   `${process.env.REACT_APP_BASE_URL}/${url.LOGIN}`,
    //   user,
    //   {
    //     withCredentials: true,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   }
    // );
    const res = await instance.post(`/${url.LOGIN}`, user);
    if (res.data?.success) {
      dispatch(loginSuccess(res.data));
      navigate(from);
    } else dispatch(loginFailed(res.data));
  } catch (error) {
    console.log(error);
    if (error?.response?.data !== undefined) {
      dispatch(
        loginFailed({ success: false, message: error?.response?.data?.message })
      );
    } else {
      dispatch(loginFailed({ success: false, message: error.message }));
    }
  }
};

export const logOutHelper = async (dispatch, id, accessToken) => {
  dispatch(logOutStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${url.LOGOUT}`,
      id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    dispatch(logOutSuccess(res.data));
  } catch (errors) {
    dispatch(logOutFailed(errors?.response?.data?.message));
  }
};
