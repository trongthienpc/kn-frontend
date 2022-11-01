import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import menuSlice from "./reducers/menuSlice";

const store = configureStore({
  reducer: {
    menu: menuSlice,
    auth: authSlice,
  },
});

export default store;
