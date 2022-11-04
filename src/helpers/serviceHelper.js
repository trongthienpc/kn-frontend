import * as url from "../constants/url-helper";
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
} from "../store/reducers/serviceSlice";
// @desc get all services

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
      `/${url.GET_SERVICE}?page=${page}&pageSize=${pageSize}&search=${search}`,
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
    const result = await axiosJWT.post(`/${url.ADD_SERVICE}`, service, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log(result);
    if (result?.data?.success) dispatch(addServiceSuccess(result?.data?.data));
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
    const results = await axiosJWT.delete(`/${url.DEL_SERVICE}/${serviceId}`, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
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
      `/${url.UPDATE_SERVICE}/${service?.id}`,
      service,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    dispatch(updateServiceSuccess(result?.data?.data));
  } catch (errors) {
    dispatch(updateServiceFailed(errors?.response?.data?.message));
  }
};
