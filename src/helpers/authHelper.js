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

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${url.LOGIN}`,
      user,
      { withCredentials: true }
    );
    if (res.data?.status) dispatch(loginSuccess(res.data));
    else dispatch(loginFailed(res.data));
    navigate(from);
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

export const logOutHelper = async (
  dispatch,
  id,
  navigate,
  accessToken,
  axiosJWT
) => {
  dispatch(logOutStart());
  try {
    const res = await axiosJWT.post(
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
