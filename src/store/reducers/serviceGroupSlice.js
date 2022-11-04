import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const serviceGroupSlice = createSlice({
  name: "serviceGroup",
  initialState: {
    success: false,
    message: "",
    loading: false,
    groups: [],
    group: {},
    page: 1,
    totalPages: 1,
    totalGroups: 0,
  },
  reducers: {
    getServiceGroupStart: (state, action) => {
      state.loading = true;
      state.message = "Get Service Group started...";
    },
    getServiceGroupSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.group = action.payload.data;
    },
    getServiceGroupFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.group = {};
      state.message = action.payload.message;
    },
    getServiceGroupsStart: (state, action) => {
      state.loading = true;
      state.message = "Get ServiceGroups started...";
    },
    getServiceGroupsSuccess: (state, action) => {
      // toast.success(`Get ${action.payload?.totalServiceGroups} ServiceGroups!`);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        page: action.payload.page,
        groups: action.payload.groups,
        totalPages: action.payload.totalPages,
        totalGroups: action.payload.totalGroups,
      };
      // state.loading = false;
      // state.message = action.payload.message;
      // state.success = action.payload.success;
      // state.page = action.payload.page;
      // state.ServiceGroups = action.payload.ServiceGroups;
      // state.totalPages = action.payload.totalPages;
      // state.totalServiceGroups = action.payload.totalServiceGroups;
    },
    getServiceGroupsFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        groups: [],
      };
      // state.loading = false;
      // state.success = false;
      // state.ServiceGroups = [];
      // state.message = action.payload.message;
    },
    addServiceGroupStart: (state, action) => {
      state.loading = true;
      state.message = "Add new ServiceGroup started...";
    },
    addServiceGroupSuccess: (state, action) => {
      toast.success("Thêm mới thành công");
      state.loading = false;
      state.success = true;
      state.message = "Add new Service Group successfully";
      state.groups = [action.payload, ...state.groups];
    },
    addServiceGroupFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    updateServiceGroupStart: (state, action) => {
      state.loading = true;
      state.message = "Update the ServiceGroup started...";
    },
    updateServiceGroupSuccess: (state, action) => {
      toast.success("Cập nhât dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Updated the Service Group successfully";
      state.groups = [
        action.payload,
        ...state.groups.filter((x) => x.id !== action.payload.id),
      ];
    },
    updateServiceGroupFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    deleteServiceGroupStart: (state, action) => {
      state.loading = true;
      state.message = "Delete the Service Group started...";
    },
    deleteServiceGroupSuccess: (state, action) => {
      toast.success("Xóa dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Deleted the Service Group successfully";
      state.groups = state.groups.filter((x) => x.value !== action.payload);
    },
    deleteServiceGroupFailed: (state, action) => {
      state.loading = false;
      state.message = action.message;
      state.success = false;
    },
  },
});

export const {
  addServiceGroupFailed,
  addServiceGroupStart,
  addServiceGroupSuccess,
  deleteServiceGroupFailed,
  deleteServiceGroupStart,
  deleteServiceGroupSuccess,
  getServiceGroupFailed,
  getServiceGroupStart,
  getServiceGroupSuccess,
  getServiceGroupsFailed,
  getServiceGroupsStart,
  getServiceGroupsSuccess,
  updateServiceGroupFailed,
  updateServiceGroupStart,
  updateServiceGroupSuccess,
} = serviceGroupSlice.actions;
export default serviceGroupSlice.reducer;
