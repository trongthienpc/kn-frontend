import * as url from "../constants/url-helper";
import {
  addKpiFailed,
  addKpiStart,
  addKpiSuccess,
  deleteKpiFailed,
  deleteKpiStart,
  deleteKpiSuccess,
  getKpisFailed,
  getKpisStart,
  getKpisSuccess,
  updateKpiFailed,
  updateKpiStart,
  updateKpiSuccess,
} from "../store/reducers/kpiSlice";

// @router baseURL/kpi
export const getKpis = async (
  accessToken,
  dispatch,
  axiosJWT,
  page,
  pageSize,
  search
) => {
  // start action get customers flag
  dispatch(getKpisStart());

  // action ...
  try {
    const results = await axiosJWT.get(
      `/${url.GET_KPI}?page=${page}&pageSize=${pageSize}&search=${search}`,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    // action success
    dispatch(getKpisSuccess(results.data));
  } catch (errors) {
    // action failed
    dispatch(getKpisFailed(errors));
  }
};

// @desc post kpi
// @route baseURL/kpi
export const addKpi = async (accessToken, dispatch, axiosJWT, entity) => {
  //start add kpi flag
  dispatch(addKpiStart());

  // action body ....
  try {
    const result = await axiosJWT.post(`/${url.ADD_KPI}`, entity, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log(result);
    if (result?.data?.success) dispatch(addKpiSuccess(result?.data?.data));
  } catch (err) {
    dispatch(addKpiFailed(err?.response?.data?.message));
  }
};

// @desc delete kpi
// @route baseURL/kpi/:id
// @param {string} kpi id
export const deleteKpi = async (accessToken, dispatch, axiosJWT, kpiId) => {
  // start delete customer flag ...
  dispatch(deleteKpiStart());

  // action body ....
  try {
    const results = await axiosJWT.delete(`/${url.DEL_KPI}/${kpiId}`, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    if (results.success) dispatch(deleteKpiSuccess(kpiId));
  } catch (err) {
    dispatch(deleteKpiFailed(err?.message));
  }
};

// @desc update kpi
// @route baseURL/kpi/:id
// @param {string} kpi id
export const updateKpi = async (accessToken, dispatch, axiosJWT, entity) => {
  // start update customer flag ...
  dispatch(updateKpiStart());

  try {
    // update customer body ...
    const result = await axiosJWT.put(
      `/${url.UPDATE_KPI}/${entity?.id}`,
      entity,
      { headers: { token: `Bearer ${accessToken}` }, withCredentials: true }
    );

    dispatch(updateKpiSuccess(result?.data?.data));
  } catch (errors) {
    dispatch(updateKpiFailed(errors?.response?.data?.message));
  }
};
