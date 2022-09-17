import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDate } from "../../helpers";
import { CURRENCY } from "../../types/enums";
import { LoanDetails } from "../../types/types";

const initialState: LoanDetails = {
  id: "",
  name: "",
  sum: 0,
  currency: CURRENCY.EUR,
  date: getDate().fullDate,
  creditorEmail: "",
  debtorEmail: "",
  personId: "",
  isPayed: false,
};

export const loan = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoan: (state, value: PayloadAction<any>) => {
      const {
        payload: {
          id,
          name,
          creditorEmail,
          sum,
          debtorEmail,
          date,
          currency,
          personId,
          isPayed,
        },
      } = value;
      state.id = id ? id : state.id;
      state.name = name ? name : state.name;
      state.sum = sum ? sum : state.sum;
      state.currency = currency ? currency : state.currency;
      state.date = date ? date : state.date;
      state.creditorEmail = creditorEmail ? creditorEmail : state.creditorEmail;
      state.debtorEmail = debtorEmail ? debtorEmail : state.debtorEmail;
      state.personId = personId ? personId : state.personId;
      state.isPayed = isPayed ? isPayed : state.isPayed;
    },
  },
});

export const { setLoan } = loan.actions;
export default loan.reducer;
