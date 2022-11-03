import data from "../constants/menu";
import * as url from "../constants/url-helper";
// @desc get all service groups

import {
  addServiceGroupFailed,
  addServiceGroupStart,
  addServiceGroupSuccess,
  deleteServiceGroupFailed,
  deleteServiceGroupStart,
  deleteServiceGroupSuccess,
  getServiceGroupsFailed,
  getServiceGroupsStart,
  getServiceGroupsSuccess,
  updateServiceGroupFailed,
  updateServiceGroupStart,
  updateServiceGroupSuccess,
} from "../store/reducers/serviceGroupSlice";

// @router baseURL/customer
export const getServiceGroups = async (
  accessToken,
  dispatch,
  axiosJWT,
  page,
  pageSize,
  search
) => {
  // start action get customers flag
  dispatch(getServiceGroupsStart());

  // action ...
  try {
    const results = await axiosJWT.get(
      `/${url.GET_GROUP}?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        headers: { token: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );

    // action success
    dispatch(getServiceGroupsSuccess(results.data));
  } catch (errors) {
    // action failed
    dispatch(getServiceGroupsFailed(errors));
  }
};

// @desc post service group
// @route baseURL/service-group
export const addServiceGroup = async (
  accessToken,
  dispatch,
  axiosJWT,
  group
) => {
  //start add customer flag
  dispatch(addServiceGroupStart());

  // action body ....
  try {
    const result = await axiosJWT.post(`/${url.ADD_GROUP}`, group, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    if (result?.data?.success) dispatch(addServiceGroupSuccess(group));
    else
      dispatch(
        addServiceGroupFailed(result?.data?.message || "Thêm mới thất bại rồi!")
      );
  } catch (err) {
    dispatch(addServiceGroupFailed(err?.response?.data?.message));
  }
};

// @desc delete service group
// @route baseURL/service-group/:value
// @param {string} service group value
export const deleteServiceGroup = async (
  accessToken,
  dispatch,
  axiosJWT,
  groupId
) => {
  // start delete customer flag ...
  dispatch(deleteServiceGroupStart());

  // action body ....
  try {
    const results = await axiosJWT.delete(
      `${process.env.REACT_APP_BASE_URL}/${url.DEL_GROUP}/${groupId}`,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );
    if (results.success) dispatch(deleteServiceGroupSuccess(groupId));
  } catch (err) {
    dispatch(deleteServiceGroupFailed(err?.message));
  }
};

// @desc update service group
// @route baseURL/service-group/:value
// @param {string} service group value
export const updateServiceGroup = async (
  accessToken,
  dispatch,
  axiosJWT,
  group
) => {
  // start update customer flag ...
  dispatch(updateServiceGroupStart());

  try {
    // update customer body ...
    const result = await axiosJWT.put(
      `${process.env.REACT_APP_BASE_URL}/${url.UPDATE_GROUP}/${group?.value}`,
      group,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    dispatch(updateServiceGroupSuccess(group));
  } catch (errors) {
    dispatch(updateServiceGroupFailed(errors?.response?.data?.message));
  }
};
