import { createSlice } from "@reduxjs/toolkit";
import {
  defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
} from "../../constants/defaultValues";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    containerClassnames: defaultMenuType,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount: 0,
    selectedMenuHasSubItems: defaultMenuType === "menu-default menu-sub-hidden",
  },
  reducers: {
    MENU_CHANGE_HAS_SUB_ITEM_STATUS: (state, action) => {
      state.selectedMenuHasSubItems = action.payload;
    },
    MENU_SET_CLASSNAMES: (state, action) => {
      state.containerClassnames = action.payload?.containerClassnames;
      state.menuClickCount = action.payload?.menuClickCount;
    },
    MENU_CLICK_MOBILE_MENU: (state, action) => {
      state.containerClassnames = action.payload?.containerClassnames;
      state.menuClickCount = action.payload?.menuClickCount;
    },
    MENU_CONTAINER_ADD_CLASSNAME: (state, action) => {
      state.containerClassnames = action.payload;
    },
    MENU_CHANGE_DEFAULT_CLASSES: (state, action) => {
      state.containerClassnames = action.payload;
    },
  },
});

export const {
  MENU_CHANGE_HAS_SUB_ITEM_STATUS,
  MENU_SET_CLASSNAMES,
  MENU_CLICK_MOBILE_MENU,
  MENU_CONTAINER_ADD_CLASSNAME,
  MENU_CHANGE_DEFAULT_CLASSES,
} = menuSlice.actions;

export default menuSlice.reducer;
