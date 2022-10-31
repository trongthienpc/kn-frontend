import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./reducers/menuSlice";

const store = configureStore({
  reducer: {
    menu: menuSlice,
  },
});

export default store;
