import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    success: false,
    message: "",
    loading: false,
    services: [],
    service: {},
    page: 1,
    totalPages: 1,
    totalServices: 0,
  },
  reducers: {
    getServiceStart: (state, action) => {
      state.loading = true;
      state.message = "Get service started...";
    },
    getServiceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.service = action.payload.data;
    },
    getServiceFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.service = {};
      state.message = action.payload.message;
    },
    getServicesStart: (state, action) => {
      state.loading = true;
      state.message = "Get services started...";
    },
    getServicesSuccess: (state, action) => {
      // toast.success(`Get ${action.payload?.totalServices} Services!`);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        page: action.payload.page,
        services: action.payload.services,
        totalPages: action.payload.totalPages,
        totalServices: action.payload.totalServices,
      };
    },
    getServicesFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        services: [],
      };
    },
    addServiceStart: (state, action) => {
      state.loading = true;
      state.message = "Add new service started...";
    },
    addServiceSuccess: (state, action) => {
      toast.success("Thêm mới thành công");
      state.loading = false;
      state.success = true;
      state.message = "Add new service successfully";
      state.services = [action.payload, ...state.services];
    },
    addServiceFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    updateServiceStart: (state, action) => {
      state.loading = true;
      state.message = "Update the service started...";
    },
    updateServiceSuccess: (state, action) => {
      toast.success("Cập nhât dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Updated the service successfully";
      state.services = [
        action.payload,
        ...state.services.filter((x) => x.value !== action.payload.value),
      ];
    },
    updateServiceFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    deleteServiceStart: (state, action) => {
      state.loading = true;
      state.message = "Delete the service started...";
    },
    deleteServiceSuccess: (state, action) => {
      toast.success("Xóa dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Deleted the service successfully";
      state.services = state.services.filter((x) => x.value !== action.payload);
    },
    deleteServiceFailed: (state, action) => {
      state.loading = false;
      state.message = action.message;
      state.success = false;
    },
  },
});

export const {
  addServiceFailed,
  addServiceStart,
  addServiceSuccess,
  deleteServiceFailed,
  deleteServiceStart,
  deleteServiceSuccess,
  getServiceFailed,
  getServiceStart,
  getServiceSuccess,
  getServicesFailed,
  getServicesStart,
  getServicesSuccess,
  updateServiceFailed,
  updateServiceStart,
  updateServiceSuccess,
} = serviceSlice.actions;
export default serviceSlice.reducer;
