import * as url from "../constants/url-helper";
import {
  addTransactionFailed,
  addTransactionStart,
  addTransactionSuccess,
  deleteTransactionFailed,
  deleteTransactionStart,
  deleteTransactionSuccess,
  getTransactionsFailed,
  getTransactionsStart,
  getTransactionsSuccess,
  updateTransactionFailed,
  updateTransactionStart,
  updateTransactionSuccess,
} from "../store/reducers/transactionSlice";

// @desc get all services

// @router baseURL/customer
export const getTransactions = async (
  accessToken,
  dispatch,
  axiosJWT,
  page,
  pageSize,
  search
) => {
  // start action get customers flag
  dispatch(getTransactionsStart());

  // action ...
  try {
    const results = await axiosJWT.get(
      `/${url.GET_TRANSACTION}?page=${page}&pageSize=${pageSize}&search=${search}`,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    // action success
    dispatch(getTransactionsSuccess(results.data));
  } catch (errors) {
    // action failed
    dispatch(getTransactionsFailed(errors));
  }
};

// @desc post service
// @route baseURL/service
export const addTransaction = async (
  accessToken,
  dispatch,
  axiosJWT,
  entity
) => {
  //start add customer flag
  dispatch(addTransactionStart());

  // action body ....
  try {
    const result = await axiosJWT.post(`/${url.ADD_TRANSACTION}`, entity, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log(result);
    if (result?.data?.success)
      dispatch(addTransactionSuccess(result?.data?.data));
  } catch (err) {
    dispatch(addTransactionFailed(err?.response?.data?.message));
  }
};

// @desc delete service
// @route baseURL/service/:id
// @param {string} service id
export const deleteTransaction = async (
  accessToken,
  dispatch,
  axiosJWT,
  serviceId
) => {
  // start delete customer flag ...
  dispatch(deleteTransactionStart());

  // action body ....
  try {
    const results = await axiosJWT.delete(
      `/${url.DEL_TRANSACTION}/${serviceId}`,
      {
        headers: { token: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    if (results.success) dispatch(deleteTransactionSuccess(serviceId));
  } catch (err) {
    dispatch(deleteTransactionFailed(err?.message));
  }
};

// @desc update service
// @route baseURL/service/:id
// @param {string} service id
export const updateTransaction = async (
  accessToken,
  dispatch,
  axiosJWT,
  service
) => {
  // start update customer flag ...
  dispatch(updateTransactionStart());

  try {
    // update customer body ...
    const result = await axiosJWT.put(
      `/${url.UPDATE_TRANSACTION}/${service?.id}`,
      service,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    dispatch(updateTransactionSuccess(result?.data?.data));
  } catch (errors) {
    dispatch(updateTransactionFailed(errors?.response?.data?.message));
  }
};
