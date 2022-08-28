import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: number;
  currency: string;
  accountID: string;
  teamID: string;
  refreshToken: string;
}

const initialState: { userState: UserState } = {
  userState: {
    id: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: 0,
    currency: "",
    accountID: "",
    teamID: "",
    refreshToken: "",
  },
};

export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, value: PayloadAction<any>) => {
      const { userState } = state;
      const { payload } = value;
      state.userState = payload?.user;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
