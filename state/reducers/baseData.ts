import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDate } from "../../helpers";

export interface BaseDataState {
  userEmail: string;
  chosenDate: string;
  personFilter: string;
  sortFilter: string;
}

const initialState: BaseDataState = {
  userEmail: "",
  chosenDate: getDate().date,
  personFilter: "Group",
  sortFilter: "Date",
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
  },
});

export const { setEmail, setDate, setPersonFilter, setSortFilter } =
  baseData.actions;
export default baseData.reducer;
