import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDate } from "../../helpers";
import { CURRENCY } from "../../types/enums";
import { TransactionDetails } from "../../types/types";

const initialState: TransactionDetails = {
  id: "",
  name: "",
  category: "",
  sum: 0,
  date: getDate().fullDate,
  currency: CURRENCY.EUR,
  personId: "",
};

export const transaction = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, value: PayloadAction<any>) => {
      const {
        payload: { id, name, category, sum, isLoan, date, currency, personId },
      } = value;
      state.id = id ? id : state.id;
      state.name = name ? name : state.name;
      state.category = category ? category : state.category;
      state.sum = sum ? sum : state.sum;
      state.date = date ? date : state.date;
      state.currency = currency ? currency : state.currency;
      state.personId = personId ? personId : state.personId;
    },
  },
});

export const { setTransaction } = transaction.actions;
export default transaction.reducer;
