import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const kpiSlice = createSlice({
  name: "kpi",
  initialState: {
    success: false,
    message: "",
    loading: false,
    kpis: [],
    kpi: {},
    page: 1,
    totalPages: 1,
    totalKpis: 0,
  },
  reducers: {
    getKpiStart: (state, action) => {
      state.loading = true;
      state.message = "Get kpi started...";
    },
    getKpiSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.kpi = action.payload.data;
    },
    getKpiFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.kpi = {};
      state.message = action.payload.message;
    },
    getKpisStart: (state, action) => {
      state.loading = true;
      state.message = "Get kpis started...";
    },
    getKpisSuccess: (state, action) => {
      console.log(action.payload);

      // toast.success(`Get ${action.payload?.totalKpis} Kpis!`);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        page: action.payload.page,
        kpis: action.payload.kpis,
        totalPages: action.payload.totalPages,
        totalKpis: action.payload.totalKpis,
      };
    },
    getKpisFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        kpis: [],
      };
    },
    addKpiStart: (state, action) => {
      state.loading = true;
      state.message = "Add new kpi started...";
    },
    addKpiSuccess: (state, action) => {
      toast.success("Thêm mới thành công");
      state.loading = false;
      state.success = true;
      state.message = "Add new kpi successfully";
      state.kpis = [action.payload, ...state.kpis];
    },
    addKpiFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    updateKpiStart: (state, action) => {
      state.loading = true;
      state.message = "Update the kpi started...";
    },
    updateKpiSuccess: (state, action) => {
      toast.success("Cập nhât dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Updated the kpi successfully";
      state.kpis = [
        action.payload,
        ...state.kpis.filter((x) => x.id !== action.payload.id),
      ];
    },
    updateKpiFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    deleteKpiStart: (state, action) => {
      state.loading = true;
      state.message = "Delete the kpi started...";
    },
    deleteKpiSuccess: (state, action) => {
      toast.success("Xóa dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Deleted the kpi successfully";
      state.kpis = state.kpis.filter((x) => x.value !== action.payload);
    },
    deleteKpiFailed: (state, action) => {
      state.loading = false;
      state.message = action.message;
      state.success = false;
    },
  },
});

export const {
  addKpiFailed,
  addKpiStart,
  addKpiSuccess,
  deleteKpiFailed,
  deleteKpiStart,
  deleteKpiSuccess,
  getKpiFailed,
  getKpiStart,
  getKpiSuccess,
  getKpisFailed,
  getKpisStart,
  getKpisSuccess,
  updateKpiFailed,
  updateKpiStart,
  updateKpiSuccess,
} = kpiSlice.actions;
export default kpiSlice.reducer;
