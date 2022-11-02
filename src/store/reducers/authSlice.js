import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    success: false,
    loading: false,
    message: "",
  },
  reducers: {
    loginStarted: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      toast.success(action.payload.message);
      // console.log(action.payload.data);
      state.success = true;
      state.message = "login successfully!";
      state.currentUser = action.payload.data;
      state.loading = false;
    },
    loginFailed: (state, action) => {
      if (action?.payload?.message?.includes("No user found"))
        toast.error("Không tìm thấy người dùng này!");
      else toast.error("Đăng nhập không thành công!");
      if (action?.payload?.message?.includes("Network Error"))
        toast.error("Kết nối máy chủ không thành công");
      state.loading = false;
      state.success = false;
      state.message = action.payload;
      state.currentUser = null;
    },
    logOutStart: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state, action) => {
      toast.success(action.payload.message);
      state.currentUser = null;
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    logOutFailed: (state, action) => {
      toast.error(action.payload);
      state.currentUser = null;
      state.loading = false;
      state.success = false;
      state.message = action.payload;
    },
    refreshTokeStart: (state) => {
      state.message = "Refresh token is starting";
    },

    refreshTokeFailed: (state, action) => {
      // console.log(action);
      state.loading = false;
      state.success = false;
      state.message = action.payload;
    },
    refreshTokeSuccess: (state, action) => {
      // console.log(action.payload);
      state.currentUser = action.payload;
      state.loading = false;
      state.message = "Refresh token successfully!";
      state.success = true;
    },
  },
});

export const {
  logOutFailed,
  logOutStart,
  logOutSuccess,
  loginFailed,
  loginStarted,
  loginSuccess,
  refreshTokeFailed,
  refreshTokeStart,
  refreshTokeSuccess,
} = authSlice.actions;

export default authSlice.reducer;
