import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/authSlice";
import menuSlice from "./reducers/menuSlice";
import serviceGroupSlice from "./reducers/serviceGroupSlice";
import serviceSlice from "./reducers/serviceSlice";
import transactionSlice from "./reducers/transactionSlice";

const persistConfig = {
  key: "root",
  version: "1.0.0",
  storage,
};
const rootReducer = combineReducers({
  menu: menuSlice,
  auth: authSlice,
  serviceGroup: serviceGroupSlice,
  service: serviceSlice,
  transaction: transactionSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persister = persistStore(store);
