import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    success: false,
    message: "",
    loading: false,
    users: [],
    user: {},
    page: 1,
    totalPages: 1,
    totalUsers: 0,
  },
  reducers: {
    getUserStart: (state, action) => {
      state.loading = true;
      state.message = "Get user started...";
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.user = action.payload.data;
    },
    getUserFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.user = {};
      state.message = action.payload.message;
    },
    getUsersStart: (state, action) => {
      state.loading = true;
      state.message = "Get users started...";
    },
    getUsersSuccess: (state, action) => {
      // toast.success(`Get ${action.payload?.totalUsers} Users!`);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        page: action.payload.page,
        users: action.payload.users,
        totalPages: action.payload.totalPages,
        totalUsers: action.payload.totalUsers,
      };
    },
    getUsersFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        users: [],
      };
    },
    addUserStart: (state, action) => {
      state.loading = true;
      state.message = "Add new user started...";
    },
    addUserSuccess: (state, action) => {
      toast.success("Thêm mới thành công");
      state.loading = false;
      state.success = true;
      state.message = "Add new user successfully";
      state.users = [action.payload, ...state.users];
    },
    addUserFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    updateUserStart: (state, action) => {
      state.loading = true;
      state.message = "Update the user started...";
    },
    updateUserSuccess: (state, action) => {
      toast.success("Cập nhât dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Updated the user successfully";
      state.users = [
        action.payload,
        ...state.users.filter((x) => x.id !== action.payload.id),
      ];
    },
    updateUserFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    deleteUserStart: (state, action) => {
      state.loading = true;
      state.message = "Delete the user started...";
    },
    deleteUserSuccess: (state, action) => {
      toast.success("Xóa dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Deleted the user successfully";
      state.users = state.users.filter((x) => x.value !== action.payload);
    },
    deleteUserFailed: (state, action) => {
      state.loading = false;
      state.message = action.message;
      state.success = false;
    },
  },
});

export const {
  addUserFailed,
  addUserStart,
  addUserSuccess,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
