import { configureStore } from "@reduxjs/toolkit";
import baseData from "./reducers/baseData";
import loan from "./reducers/loan";
import transaction from "./reducers/transaction";

export const store = configureStore({
  reducer: {
    baseData: baseData,
    transaction: transaction,
    loan: loan,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
