import { configureStore } from "@reduxjs/toolkit";
import teamSlice from "./reducers/team";
import transactionsSlice from "./reducers/transactions";
import userSlice from "./reducers/user";

export const store = configureStore({
  reducer: {
    userState: userSlice,
    transactionsState: transactionsSlice,
    teamState: teamSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
