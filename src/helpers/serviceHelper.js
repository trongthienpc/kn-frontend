import * as url from "../constants/url-helper";
// @desc get all services

import {
  addServiceFailed,
  addServiceStart,
  addServiceSuccess,
  deleteServiceFailed,
  deleteServiceStart,
  deleteServiceSuccess,
  getServicesFailed,
  getServicesStart,
  getServicesSuccess,
  updateServiceFailed,
  updateServiceStart,
  updateServiceSuccess,
} from "../store/reducers/serviceGroupSlice";

// @router baseURL/customer
export const getServices = async (
  accessToken,
  dispatch,
  axiosJWT,
  page,
  pageSize,
  search
) => {
  // start action get customers flag
  dispatch(getServicesStart());

  // action ...
  try {
    const results = await axiosJWT.get(
      `${process.env.REACT_APP_BASE_URL}/${url.GET_GROUP}?page=${page}&pageSize=${pageSize}&search=${search}`,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    // action success
    dispatch(getServicesSuccess(results.data));
  } catch (errors) {
    // action failed
    dispatch(getServicesFailed(errors));
  }
};

// @desc post service
// @route baseURL/service
export const addService = async (accessToken, dispatch, axiosJWT, service) => {
  //start add customer flag
  dispatch(addServiceStart());

  // action body ....
  try {
    const results = await axiosJWT.post(
      `${process.env.REACT_APP_BASE_URL}/${url.ADD_GROUP}`,
      service,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );
    if (results?.success) dispatch(addServiceSuccess(service));
  } catch (err) {
    dispatch(addServiceFailed(err?.response?.data?.message));
  }
};

// @desc delete service
// @route baseURL/service/:id
// @param {string} service id
export const deleteService = async (
  accessToken,
  dispatch,
  axiosJWT,
  serviceId
) => {
  // start delete customer flag ...
  dispatch(deleteServiceStart());

  // action body ....
  try {
    const results = await axiosJWT.delete(
      `${process.env.REACT_APP_BASE_URL}/${url.DEL_GROUP}/${serviceId}`,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );
    if (results.success) dispatch(deleteServiceSuccess(serviceId));
  } catch (err) {
    dispatch(deleteServiceFailed(err?.message));
  }
};

// @desc update service
// @route baseURL/service/:id
// @param {string} service id
export const updateService = async (
  accessToken,
  dispatch,
  axiosJWT,
  service
) => {
  // start update customer flag ...
  dispatch(updateServiceStart());

  try {
    // update customer body ...
    const result = await axiosJWT.put(
      `${process.env.REACT_APP_BASE_URL}/${url.UPDATE_GROUP}/${service?.id}`,
      service,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    dispatch(updateServiceSuccess(service));
  } catch (errors) {
    dispatch(updateServiceFailed(errors?.response?.data?.message));
  }
};
