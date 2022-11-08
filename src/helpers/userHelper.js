import * as url from "../constants/url-helper";
import {
  addUserFailed,
  addUserStart,
  addUserSuccess,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "../store/reducers/userSlice";

// @router baseURL/user
export const getUsers = async (
  accessToken,
  dispatch,
  axiosJWT,
  page,
  pageSize,
  search
) => {
  // start action get users flag
  dispatch(getUsersStart());

  // action ...
  try {
    const results = await axiosJWT.get(
      `/${url.USER}?page=${page}&pageSize=${pageSize}&search=${search}`,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    // action success
    dispatch(getUsersSuccess(results.data));
  } catch (errors) {
    // action failed
    dispatch(getUsersFailed(errors));
  }
};

// @desc post user
// @route baseURL/user
export const addUser = async (accessToken, dispatch, axiosJWT, entity) => {
  //start add user flag
  dispatch(addUserStart());

  // action body ....
  try {
    const result = await axiosJWT.post(`/${url.REGISTER}`, entity, {
      headers: { token: `Bearer ${accessToken}` },
      wihCredentials: true,
    });
    console.log(result);
    if (result?.data?.success) dispatch(addUserSuccess(result?.data?.data));
  } catch (err) {
    dispatch(addUserFailed(err?.response?.data?.message));
  }
};

// @desc delete user
// @route baseURL/user/:id
// @param {string} user id
export const deleteUser = async (accessToken, dispatch, axiosJWT, userId) => {
  // start delete customer flag ...
  dispatch(deleteUserStart());

  // action body ....
  try {
    const results = await axiosJWT.delete(`/${url.DEL_USER}/${userId}`, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    if (results.success) dispatch(deleteUserSuccess(userId));
  } catch (err) {
    dispatch(deleteUserFailed(err?.message));
  }
};

// @desc update user
// @route baseURL/user/:id
// @param {string} user id
export const updateUser = async (accessToken, dispatch, axiosJWT, entity) => {
  // start update customer flag ...
  dispatch(updateUserStart());

  try {
    // update customer body ...
    const result = await axiosJWT.put(
      `/${url.UPDATE_USER}/${entity?.id}`,
      entity,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    dispatch(updateUserSuccess(result?.data?.data));
  } catch (errors) {
    dispatch(updateUserFailed(errors?.response?.data?.message));
  }
};
