import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "./slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  dashboardSlice
);
const combined = combineReducers({
  auth: persistedReducer,

})
export const store = configureStore({
  reducer: combined
});


export const persistor = persistStore(store);
