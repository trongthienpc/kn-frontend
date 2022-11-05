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
    statistics: [],
  },
  reducers: {
    getTransactionStart: (state, action) => {
      state.loading = true;
      state.message = "Get transaction started...";
    },
    getTransactionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.transaction = action.payload.data;
    },
    getTransactionFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.transaction = {};
      state.message = action.payload.message;
    },
    getStatisticsStart: (state, action) => {
      state.loading = true;
      state.message = "Get statistics started...";
    },
    getStatisticsSuccess: (state, action) => {
      // toast.success(`Get ${action.payload?.totalTransactions} Transactions!`);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        statistics: action.payload.data,
      };
    },
    getStatisticsFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        statistics: [],
      };
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
    addTransactionStart: (state, action) => {
      state.loading = true;
      state.message = "Add new transaction started...";
    },
    addTransactionSuccess: (state, action) => {
      toast.success("Thêm mới thành công");
      state.loading = false;
      state.success = true;
      state.message = "Add new transaction successfully";
      state.transactions = [action.payload, ...state.transactions];
    },
    addTransactionFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    updateTransactionStart: (state, action) => {
      state.loading = true;
      state.message = "Update the transaction started...";
    },
    updateTransactionSuccess: (state, action) => {
      toast.success("Cập nhât dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Updated the transaction successfully";
      state.transactions = [
        action.payload,
        ...state.transactions.filter((x) => x.id !== action.payload.id),
      ];
    },
    updateTransactionFailed: (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    deleteTransactionStart: (state, action) => {
      state.loading = true;
      state.message = "Delete the transaction started...";
    },
    deleteTransactionSuccess: (state, action) => {
      toast.success("Xóa dữ liệu thành công");
      state.loading = false;
      state.success = true;
      state.message = "Deleted the transaction successfully";
      state.transactions = state.transactions.filter(
        (x) => x.value !== action.payload
      );
    },
    deleteTransactionFailed: (state, action) => {
      state.loading = false;
      state.message = action.message;
      state.success = false;
    },
  },
});

export const {
  addTransactionFailed,
  addTransactionStart,
  addTransactionSuccess,
  deleteTransactionFailed,
  deleteTransactionStart,
  deleteTransactionSuccess,
  getTransactionFailed,
  getTransactionStart,
  getTransactionSuccess,
  getTransactionsFailed,
  getTransactionsStart,
  getTransactionsSuccess,
  updateTransactionFailed,
  updateTransactionStart,
  updateTransactionSuccess,
  getStatisticsFailed,
  getStatisticsStart,
  getStatisticsSuccess,
} = transactionSlice.actions;
export default transactionSlice.reducer;
