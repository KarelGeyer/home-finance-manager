import { configureStore } from "@reduxjs/toolkit";
import baseData from "./reducers/baseData";

export const store = configureStore({
  reducer: {
    baseData: baseData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
