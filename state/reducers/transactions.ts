import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  name: string;
  category: string;
  sum: number;
  currency: string;
  date: string;
  isLoan: boolean;
  personId: string;
  id: string;
}

export interface TransactionsState {
  user: Transaction[];
  team: Transaction[];
}

const initialState: { transactionsState: TransactionsState } = {
  transactionsState: {
    user: [],
    team: [],
  },
};

export const transactionsSlice = createSlice({
  name: "transactionsState",
  initialState,
  reducers: {
    setTransactions: (state, value: PayloadAction<any>) => {
      const { transactionsState } = state;
      const { payload } = value;

      payload.user.transactions.forEach((transaction) => {
        console.log(transaction);
        transactionsState.user.push(transaction);
      });

      console.log(transactionsState.user.length);

      if (payload.user.team) {
        payload.user.team.forEach((user: any) => {
          user.transactions?.forEach((transaction) => {
            transactionsState.team.push(transaction);
          });
        });
      }
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
