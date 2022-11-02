import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    success: false,
    message: "",
    loading: false,
    transactions: [],
    transaction: {},
    page: 1,
    totalPages: 1,
    totalTransactions: 0,
  },
  reducers: {
    getServiceStart: (state, action) => {
      state.loading = true;
      state.message = "Get transaction started...";
    },
    getServiceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.transaction = action.payload.data;
    },
    getServiceFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.transaction = {};
      state.message = action.payload.message;
    },
    getTransactionsStart: (state, action) => {
      state.loading = true;
      state.message = "Get transactions started...";
    },
    getTransactionsSuccess: (state, action) => {
      // toast.success(`Get ${action.payload?.totalTransactions} Transactions!`);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        page: action.payload.page,
        transactions: action.payload.transactions,
        totalPages: action.payload.totalPages,
        totalTransactions: action.payload.totalTransactions,
      };
    },
    getTransactionsFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        transactions: [],
      };
    },
    addServiceStart: (state, action) => {
      state.loading = true;
      state.message = "Add new transaction started...";
    },
    addServiceSuccess: (state, action) => {
      toast.success("Thêm mới thành công");
      state.loading = false;
      state.success = true;
      state.message = "Add new transaction successfully";
      state.transactions = [action.payload, ...state.transactions];
    },
    addServiceFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    updateServiceStart: (state, action) => {
      state.loading = true;
      state.message = "Update the transaction started...";
    },
    updateServiceSuccess: (state, action) => {
      toast.success("Cập nhât dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Updated the transaction successfully";
      state.transactions = [
        action.payload,
        ...state.transactions.filter((x) => x.value !== action.payload.value),
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
      state.message = "Delete the transaction started...";
    },
    deleteServiceSuccess: (state, action) => {
      toast.success("Xóa dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Deleted the transaction successfully";
      state.transactions = state.transactions.filter(
        (x) => x.value !== action.payload
      );
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
  getTransactionsFailed,
  getTransactionsStart,
  getTransactionsSuccess,
  updateServiceFailed,
  updateServiceStart,
  updateServiceSuccess,
} = transactionSlice.actions;
export default transactionSlice.reducer;
