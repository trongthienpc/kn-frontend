import * as url from "../constants/url-helper";
import {
  addTransactionFailed,
  addTransactionStart,
  addTransactionSuccess,
  deleteTransactionFailed,
  deleteTransactionStart,
  deleteTransactionSuccess,
  getStatisticsFailed,
  getStatisticsStart,
  getStatisticsSuccess,
  getTransactionsFailed,
  getTransactionsStart,
  getTransactionsSuccess,
  updateTransactionFailed,
  updateTransactionStart,
  updateTransactionSuccess,
} from "../store/reducers/transactionSlice";

// @router baseURL/transaction
export const getStatistics = async (
  accessToken,
  dispatch,
  axiosJWT,
  month,
  year
) => {
  // start action get customers flag
  dispatch(getStatisticsStart());

  // action ...
  try {
    const results = await axiosJWT.get(
      `/${url.GET_TRANSACTION}/statistics?month=${month}&year=${year}`,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    // action success
    dispatch(getStatisticsSuccess(results.data));
  } catch (errors) {
    // action failed
    dispatch(getStatisticsFailed(errors));
  }
};

// @router baseURL/transaction
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

// @desc post transaction
// @route baseURL/transaction
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

// @desc delete transaction
// @route baseURL/transaction/:id
// @param {string} transaction id
export const deleteTransaction = async (
  accessToken,
  dispatch,
  axiosJWT,
  transactionId
) => {
  // start delete customer flag ...
  dispatch(deleteTransactionStart());

  // action body ....
  try {
    const results = await axiosJWT.delete(
      `/${url.DEL_TRANSACTION}/${transactionId}`,
      {
        headers: { token: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    if (results.success) dispatch(deleteTransactionSuccess(transactionId));
  } catch (err) {
    dispatch(deleteTransactionFailed(err?.message));
  }
};

// @desc update transaction
// @route baseURL/transaction/:id
// @param {string} transaction id
export const updateTransaction = async (
  accessToken,
  dispatch,
  axiosJWT,
  entity
) => {
  // start update customer flag ...
  dispatch(updateTransactionStart());

  try {
    // update customer body ...
    const result = await axiosJWT.put(
      `/${url.UPDATE_TRANSACTION}/${entity?.id}`,
      entity,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    dispatch(updateTransactionSuccess(result?.data?.data));
  } catch (errors) {
    dispatch(updateTransactionFailed(errors?.response?.data?.message));
  }
};
