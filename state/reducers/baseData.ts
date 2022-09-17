import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDate } from "../../helpers";
import { BaseDataState } from "../../types/types";

const initialState: BaseDataState = {
  userEmail: "",
  chosenDate: getDate().date,
  personFilter: "Group",
  sortFilter: "Date",
  transactionTypeFilter: "All",
  teamIds: [],
};

export const baseData = createSlice({
  name: "baseData",
  initialState,
  reducers: {
    setEmail: (state, value: PayloadAction<any>) => {
      state.userEmail = value.payload;
    },
    setDate: (state, value: PayloadAction<any>) => {
      state.chosenDate = value.payload;
    },
    setPersonFilter: (state, value: PayloadAction<any>) => {
      state.personFilter = value.payload;
    },
    setSortFilter: (state, value: PayloadAction<any>) => {
      state.sortFilter = value.payload;
    },
    setTransactionTypeFilter: (state, value: PayloadAction<any>) => {
      state.transactionTypeFilter = value.payload;
    },
    setTeamIds: (state, value: PayloadAction<any>) => {
      state.teamIds = value.payload;
    },
  },
});

export const {
  setEmail,
  setDate,
  setPersonFilter,
  setSortFilter,
  setTransactionTypeFilter,
  setTeamIds,
} = baseData.actions;
export default baseData.reducer;
